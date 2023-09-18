import React, { Fragment, useContext, useState } from "react";
import {
  Flexbox,
  HorizontalScrollContainer,
  ListLayout,
  ProfileImageSm,
  StyledSearch,
} from "../shared/sharedLayouts";
import { Button, Form } from "antd";
import ImageCardL from "../shared/imageCardL";
import { useNavigate } from "react-router-dom";
import { variables } from "../../common/variables";
import AntdModal from "../shared/modal";
import Title from "antd/es/typography/Title";
import { categories, raoks, userToPraise } from "../../common/mockData";
import InstallModal from "../shared/installModal";
import InstallButton from "../shared/installButton";
import { AuthContext } from "../../common/authProvider";
import GoogleLoginButton from "../shared/googleLoginButton";

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  // API call >> backend sends user to praise - this API call should happen randomly in the next 10-60 seconds after user logs in
  // API call >> GET /kindnessHistory/user >> has the user done a kindness today already?
  const [isPickEnabled, setIsPickEnabled] = useState(true);
  const [form] = Form.useForm();
  const [kindnessActions, setKindnessActions] = useState(raoks);
  let searchTimeout: NodeJS.Timeout | null = null;

  // user reached a goal - appears by backend API call trigger instantly after logged in

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
    // todo: lets make a backend call to send a cheer message to these users
  };

  const navigate = useNavigate();

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

  return (
    <>
      <ListLayout>
        <AntdModal
          title="Cheer on others"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onOk={handleOk}
          description="Sean just bought a coffee for the person next in line! Want to high five him?"
          imageUrl={userToPraise.photoUrl}
          isProfileImage
          okText="Sure!"
          cancelText="Not today"
        />
        <Flexbox style={{ margin: variables.spacingS }}>
          {user ? (
            <Button
              style={{ border: "none" }}
              icon={<ProfileImageSm src={user.picture} />}
              onClick={() => navigate("/profile")}
            />
          ) : (
            <GoogleLoginButton />
          )}
          <InstallButton />
          <InstallModal />
        </Flexbox>

        <Form
          style={{ margin: `0 ${variables.spacingS} ${variables.spacingXs} ` }}
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
        {categories.map((category) => (
          <Fragment key={category.id}>
            {kindnessActions.filter((item) => item.category === category.name)
              .length > 0 && (
              <>
                <Title level={3} style={{ margin: `0 ${variables.spacingS}` }}>
                  {category.name}
                </Title>
                <HorizontalScrollContainer>
                  {kindnessActions
                    .filter((item) => item.category === category.name)
                    .map((item) => (
                      <ImageCardL
                        item={item}
                        key={item.id}
                        isPickEnabled={isPickEnabled}
                        setIsPickEnabled={setIsPickEnabled}
                      />
                    ))}
                </HorizontalScrollContainer>
              </>
            )}
          </Fragment>
        ))}
      </ListLayout>
    </>
  );
};

export default RandomActOfKindnessList;
