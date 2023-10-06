import React, { useContext, useState } from "react";
import { Flexbox, ListLayout, StyledSearch } from "../shared/sharedLayouts";
import { Form } from "antd";
import { variables } from "../../common/variables";
import { categories, raoks } from "../../common/mockData";
import InstallModal from "../shared/installModal";
import InstallButton from "../shared/installButton";
import { AuthContext } from "../../common/authProvider";
import UserProfileIcon from "../shared/userProfileIcon";
import FeedbackModal from "./modals/feedbackModal";
import ConfirmModal from "./modals/confirmModal";
import CheersModal from "./modals/cheersModal";
import HorizontalScrollContainers from "../shared/horizontalScrollContainers";

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  // API call >> GET /kindnessHistory/user >> has the user done a kindness today already?
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [form] = Form.useForm();
  const [kindnessActions, setKindnessActions] = useState(raoks);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  let searchTimeout: NodeJS.Timeout | null = null;

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
  };

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
          userName={user?.given_name ?? undefined}
        />
        <Flexbox style={{ margin: variables.spacingS, width: "95vw" }}>
          <UserProfileIcon user={user} />
          <InstallButton />
          <InstallModal />
        </Flexbox>

        <Form
          style={{
            margin: `0 ${variables.spacingS} ${variables.spacingXs}`,
            width: "95vw",
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
        {categories.map((category, index) => (
          <HorizontalScrollContainers
            category={category}
            onPick={onPick}
            isPickEnabled={isPickEnabled}
            kindnessActions={kindnessActions}
            key={index}
          />
        ))}
      </ListLayout>
    </>
  );
};

export default RandomActOfKindnessList;
