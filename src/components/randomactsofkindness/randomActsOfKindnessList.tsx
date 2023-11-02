import React, { useContext, useEffect, useState } from "react";
import { ListLayout, CenterAlignedFlexbox } from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import { categories } from "../../common/mockData";
import InstallModal from "../shared/pwaCustomInstalls/installModal";
import InstallButton from "../shared/pwaCustomInstalls/installButton";
import { AuthContext } from "../../common/authProvider";
import FeedbackModal from "./modals/feedbackModal";
import ConfirmModal from "./modals/confirmModal";
import CheersModal from "./modals/cheersModal";
import HorizontalScrollContainers from "../shared/horizontalScrollContainers";
import InstallAlert from "../shared/pwaCustomInstalls/installAlert";
import { Category, KindnessAction } from "../../common/interfaces";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardContainer from "../shared/cardContainer";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import UserProfileIcon from "../shared/userProfileIcon";
import { completeUserJourney, showUserJourney } from "../shared/userJourney";
import { useGetApi, usePostApi } from "../../common/apiCalls";
import PageError from "../shared/pageError";
import Loading from "../shared/loading";
import { shuffleArray } from "../../common/util";
import useKindnessHistory from "../../hooks/useKindnessHistory";
import Search from "../shared/search";
import { RedoOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useSignalR from "../../hooks/useSignalR";
import { useDispatch, useSelector } from "react-redux";
import { selectDailyIsDone, selectUserStreak } from "../../redux/selectors";
import { setDailyDone, setUserStreak } from "../../common/auth.reducer";

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const dailyIsDone = useSelector(selectDailyIsDone);
  const userStreak = useSelector(selectUserStreak);

  const [daily, setDaily] = useState<KindnessAction | undefined>();
  const [kindnessActions, setKindnessActions] = useState<KindnessAction[] | []>(
    []
  );
  const [likedActions, setLikedActions] = useState<number[] | []>([]);
  const [filteredActions, setFilteredActions] = useState<KindnessAction[] | []>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const { callGetApi, loading, error } = useGetApi("api/Kindness");
  const {
    callPostApi: callPostKindnessHistory,
    loading: loadingPostKindnessHistory,
    error: errorPostKindnessHistory,
  } = usePostApi(`api/KindnessHistory/${daily?.id}`);
  const { getHistory } = useKindnessHistory();
  const { callGetApi: getLikedActions } = useGetApi(`api/LikedKindness`);
  const navigate = useNavigate();
  // track if API call was ever successful - needed because sometimes the first API call returns with ERR_UNREACHABLE but second is 200
  const [apiSuccess, setApiSuccess] = useState(false);
  const hubConnection = useSignalR(
    "https://bekind-api.azurewebsites.net/notificationhub"
  );
  const dispatch = useDispatch();

  // 1. move user to redux (with createslice)

  useEffect(() => {
    async function fetchData() {
      const actions = await callGetApi();
      const shuffled = shuffleArray(actions?.data);
      setKindnessActions(shuffled);
      setFilteredActions(shuffled);
      if (actions?.status === 200) {
        setApiSuccess(true);
      }
    }
    fetchData();
  }, [callGetApi]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    async function fetchData() {
      const actions = await getLikedActions();
      setLikedActions(actions?.data);
    }
    fetchData();
  }, [getLikedActions]);

  useEffect(() => {
    const category = searchParams.get("category");
    const categoryId = categories.find((item) => item.name === category)?.id;

    if (category) {
      const filteredRaoks = kindnessActions.filter((item) => {
        return item.category === categoryId;
      });
      setFilteredActions(filteredRaoks);
    } else if (searchParams.size === 0) {
      setFilteredActions(kindnessActions);
    }
  }, [searchParams, kindnessActions]);

  // listen to backend if a badge is reached
  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveNotification", (message: string) => {
        console.log("Notification received: ", message);
        // congratulation modal for the badge
        // Update this MemberBadge with a PUT to enable it for user
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceiveNotification");
      }
    };
  }, [hubConnection]);

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    callPostKindnessHistory();
    if (!errorPostKindnessHistory) {
      setIsFeedbackModalOpen(true);
      dispatch(setDailyDone(true));
      const newStreak = userStreak + 1;
      dispatch(setUserStreak(newStreak));
    }
  };

  const onPick = (
    event: React.MouseEvent<HTMLElement>,
    item: KindnessAction
  ) => {
    event.stopPropagation();
    setDaily(item);
    setIsConfirmModalOpen(true);
    completeUserJourney();
  };

  const filterByCategory = (category: Category) => {
    setSearchParams({ category: category.name });
  };

  const displayTour = showUserJourney();

  if (loading || loadingPostKindnessHistory) {
    return <Loading />;
  }

  return (
    <>
      <ListLayout>
        <CheersModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ConfirmModal
          isModalOpen={isConfirmModalOpen}
          setIsModalOpen={setIsConfirmModalOpen}
          onOk={onConfirmOk}
        />
        <FeedbackModal
          isModalOpen={isFeedbackModalOpen}
          setIsModalOpen={setIsFeedbackModalOpen}
          userName={user?.firstName ?? undefined}
        />
        <Header
          left={searchParams.size === 0 ? undefined : <BackButton />}
          right={<UserProfileIcon user={user} />}
        />
        <Search
          actions={kindnessActions}
          setFilteredActions={setFilteredActions}
        />
        {error && !apiSuccess && (
          <PageError
            message="An error happened, sorry!"
            description={
              <CenterAlignedFlexbox>
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={() => navigate(0)}
                >
                  Let's try again
                </Button>
              </CenterAlignedFlexbox>
            }
            style={{ margin: variables.spacingXs }}
          />
        )}
        {searchParams.get("category") && (
          <CardContainer
            onPick={onPick}
            isPickEnabled={!dailyIsDone}
            kindnessActions={filteredActions}
            likedActions={likedActions}
          />
        )}
        {searchParams.size === 0 &&
          categories.map((category, index) => (
            <HorizontalScrollContainers
              category={category}
              onPick={onPick}
              isPickEnabled={!dailyIsDone}
              kindnessActions={filteredActions}
              key={index}
              filterByCategory={filterByCategory}
              displayTour={displayTour}
              likedActions={likedActions}
            />
          ))}
        <InstallButton />
        <InstallAlert />
        <InstallModal />
      </ListLayout>
    </>
  );
};

export default RandomActOfKindnessList;
