import React, { useContext, useEffect, useRef, useState } from "react";
import { ListLayout, StyledSearch } from "../shared/sharedLayouts";
import { Form } from "antd";
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
import { useSearchParams } from "react-router-dom";
import CardContainer from "../shared/cardContainer";
import Header from "../shared/header";
import BackButton from "../shared/backButton";
import UserProfileIcon from "../shared/userProfileIcon";
import { completeUserJourney, showUserJourney } from "../shared/userJourney";
import { useGetApi, usePostApi } from "../../common/apiCalls";
import PageError from "../shared/pageError";
import Loading from "../shared/loading";

const shuffleArray = (array: KindnessAction[]) => {
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [daily, setDaily] = useState<KindnessAction | undefined>();
  const [form] = Form.useForm();
  const [kindnessActions, setKindnessActions] = useState<KindnessAction[] | []>(
    []
  );
  const [filteredActions, setFilteredActions] = useState<KindnessAction[] | []>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const { callGetApi, loading, error } = useGetApi("api/Kindness");
  const { callGetApi: getHistory } = useGetApi(`api/KindnessHistory`);
  const {
    callPostApi: callPostKindnessHistory,
    loading: loadingPostKindnessHistory,
    error: errorPostKindnessHistory,
  } = usePostApi("api/KindnessHistory");

  // 1. move user to redux (with createslice)

  useEffect(() => {
    async function fetchData() {
      const dailies = await callGetApi();
      const shuffled = shuffleArray(dailies?.data);
      setKindnessActions(shuffled);
      setFilteredActions(shuffled);
    }
    fetchData();
  }, [callGetApi]);

  useEffect(() => {
    async function fetchData() {
      const history = await getHistory();
      const latestDaily = history?.data?.at(-1);
      const dateOfLatest = new Date(latestDaily?.createdDate);
      const today = new Date();
      if (dateOfLatest.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        setIsPickEnabled(false);
      }
    }
    fetchData();
  }, [getHistory]);

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

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  // user reached a goal - appears by backend API call trigger instantly after logged in

  const onFinish = (values: any) => {
    onSearch(values.search);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (_e?: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Search after 0.7 seconds
    searchTimeout.current = setTimeout(() => {
      onSearch();
    }, 700);
  };

  const onSearch = (_e?: React.KeyboardEvent<HTMLInputElement>) => {
    const searchValue = form.getFieldValue("search");
    const searchTerm = searchValue.toLowerCase();

    if (!searchTerm) {
      setFilteredActions(kindnessActions);
      return;
    } else {
      const filteredRaoks = kindnessActions.filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description?.toLowerCase();
        return title.includes(searchTerm) || description?.includes(searchTerm);
      });

      setFilteredActions(filteredRaoks);
    }
  };

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    const now = new Date();
    const result = {
      id: 0,
      memberId: user.id,
      kindnessId: daily?.id,
      createdDate: now.toISOString(),
    };
    callPostKindnessHistory(result).then((res: any) => {
      console.log(res);
    });
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
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
        <Form
          style={{
            padding: variables.spacingXs,
            width: "100vw",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item name="search">
            <StyledSearch
              placeholder="Search"
              onChange={onChange}
              onPressEnter={onSearch}
              allowClear
            />
          </Form.Item>
        </Form>
        {(error || errorPostKindnessHistory) && (
          <PageError
            message="An error happened, sorry!"
            style={{ margin: variables.spacingXs }}
          />
        )}
        {searchParams.get("category") && (
          <CardContainer
            onPick={onPick}
            isPickEnabled={isPickEnabled}
            kindnessActions={filteredActions}
          />
        )}
        {searchParams.size === 0 &&
          categories.map((category, index) => (
            <HorizontalScrollContainers
              category={category}
              onPick={onPick}
              isPickEnabled={isPickEnabled}
              kindnessActions={filteredActions}
              key={index}
              filterByCategory={filterByCategory}
              displayTour={displayTour}
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
