import React, { Suspense, useContext, useEffect, useState } from "react";
import { ListLayout, CenterAlignedFlexbox } from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import { categories } from "../../common/mockData";
import { AuthContext } from "../../common/authProvider";
import { Category, KindnessAction } from "../../common/interfaces";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetApi } from "../../common/apiCalls";
import { shuffleArray } from "../../common/util";
import useKindnessHistory from "../../hooks/useKindnessHistory";
import { RedoOutlined } from "@ant-design/icons";
import useSignalR from "../../hooks/useSignalR";
import { Button } from "antd";
import Loading from "../shared/loading";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import UserProfileIcon from "../shared/userProfileIcon";
import Search from "../shared/search";
import CardContainer from "../shared/cardContainer";

const InstallModal = React.lazy(
  () => import("../shared/pwaCustomInstalls/installModal")
);
const InstallButton = React.lazy(
  () => import("../shared/pwaCustomInstalls/installButton")
);
const CheersModal = React.lazy(() => import("./modals/cheersModal"));
const InstallAlert = React.lazy(
  () => import("../shared/pwaCustomInstalls/installAlert")
);
const PageError = React.lazy(() => import("../shared/pageError"));

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [kindnessActions, setKindnessActions] = useState<KindnessAction[] | []>(
    []
  );
  const [likedActions, setLikedActions] = useState<number[] | []>([]);
  const [filteredActions, setFilteredActions] = useState<KindnessAction[] | []>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const { callGetApi, loading, error } = useGetApi("api/Kindness");
  const { getHistory } = useKindnessHistory();
  const { callGetApi: getLikedActions } = useGetApi(`api/LikedKindness`);
  const navigate = useNavigate();
  // track if API call was ever successful - needed because sometimes the first API call returns with ERR_UNREACHABLE but second is 200
  const [apiSuccess, setApiSuccess] = useState(false);
  const hubConnection = useSignalR(
    "https://bekind-api.azurewebsites.net/notificationhub"
  );
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

  const filterByCategory = (category: Category) => {
    if (category.name === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: category.name });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ListLayout>
        <Suspense fallback={<Loading />}>
          <CheersModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Suspense>
        <Header
          left={searchParams.size === 0 ? undefined : <BackButton />}
          right={<UserProfileIcon user={user} />}
        />
        <Search
          actions={kindnessActions}
          setFilteredActions={setFilteredActions}
        />
        {error && !apiSuccess && (
          <Suspense fallback={<Loading />}>
            <PageError
              message="An error happened, sorry!"
              description={
                <CenterAlignedFlexbox>
                  <Suspense fallback={<></>}>
                    <Button
                      type="primary"
                      icon={<RedoOutlined />}
                      onClick={() => navigate(0)}
                    >
                      Let's try again
                    </Button>
                  </Suspense>
                </CenterAlignedFlexbox>
              }
              style={{ margin: variables.spacingXs }}
            />
          </Suspense>
        )}
        <CardContainer
          actions={filteredActions}
          likedActions={likedActions}
          filterByCategory={filterByCategory}
        />
        <Suspense fallback={<></>}>
          <InstallButton />
        </Suspense>
        <Suspense fallback={<></>}>
          <InstallAlert />
        </Suspense>
        <Suspense fallback={<></>}>
          <InstallModal />
        </Suspense>
      </ListLayout>
    </>
  );
};

export default RandomActOfKindnessList;
