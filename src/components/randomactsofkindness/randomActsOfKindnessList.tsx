import React, { useContext, useEffect, useState } from "react";
import { ListLayout, StyledSearch } from "../shared/sharedLayouts";
import { Form } from "antd";
import { variables } from "../../common/variables";
import { categories, raoks } from "../../common/mockData";
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
import { getActions } from "../../common/apiCalls";

const shuffleArray = (array: KindnessAction[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  // API call >> GET /kindnessHistory/user >> has the user done a kindness today already?
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [form] = Form.useForm();
  const [kindnessActions, setKindnessActions] = useState(shuffleArray(raoks));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  let searchTimeout: NodeJS.Timeout | null = null;

  // 1. move user to redux (with createslice)
  // 2. add more specific cases for error handling
  // 3. put together the api calls into one function
  // 4. test the POST method

  useEffect(() => {
    getActions();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const filteredRaoks = raoks.filter((item) => {
        return item.category === category;
      });
      setKindnessActions(filteredRaoks);
    } else if (searchParams.size === 0) {
      setKindnessActions(shuffleArray(raoks));
    }
  }, [searchParams]);

  // user reached a goal - appears by backend API call trigger instantly after logged in

  const onFinish = (values: any) => {
    onSearch(values.search);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (_e?: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Search after 0.7 seconds
    searchTimeout = setTimeout(() => {
      onSearch();
    }, 700);
  };

  const onSearch = (_e?: React.KeyboardEvent<HTMLInputElement>) => {
    const searchValue = form.getFieldValue("search");
    const searchTerm = searchValue.toLowerCase();

    const filteredRaoks = raoks.filter((item) => {
      const title = item.title.toLowerCase();
      const description = item.description?.toLowerCase();
      return title.includes(searchTerm) || description?.includes(searchTerm);
    });
    setKindnessActions(filteredRaoks);
  };

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    // API call: lets make a backend call to add this to user's profile
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
  };

  const onPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // lets ask the user if this is today's challenge
    setIsConfirmModalOpen(true);
    completeUserJourney();
  };

  const filterByCategory = (category: Category) => {
    setSearchParams({ category: category.name });
  };

  const displayTour = showUserJourney();

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
            />
          </Form.Item>
        </Form>
        {searchParams.get("category") && (
          <CardContainer
            onPick={onPick}
            isPickEnabled={isPickEnabled}
            kindnessActions={kindnessActions}
          />
        )}
        {searchParams.size === 0 &&
          categories.map((category, index) => (
            <HorizontalScrollContainers
              category={category}
              onPick={onPick}
              isPickEnabled={isPickEnabled}
              kindnessActions={kindnessActions}
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
