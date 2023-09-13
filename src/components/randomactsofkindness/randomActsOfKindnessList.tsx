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
import { PlusOutlined } from "@ant-design/icons";
import AntdModal from "../shared/modal";
import BottomMenu from "../shared/bottomMenu";
import Title from "antd/es/typography/Title";
import { categories, raoks, userToPraise } from "../../common/mockData";
import InstallModal from "../shared/installModal";
import InstallButton from "../shared/installButton";
import { AuthContext } from "../../common/authProvider";
import GoogleLoginButton from "../shared/googleLoginButton";

const RandomActOfKindnessList: React.FC = () => {
  const { user } = useContext(AuthContext);
  // backend sends user to praise - this API call should happen randomly in the next 10-60 seconds after user logs in

  // user reached a goal - appears by backend API call trigger instantly after logged in

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
    // todo: lets make a backend call to send a cheer message to these users
  };

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // lets filter
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        >
          <Form.Item name="search">
            <StyledSearch placeholder="Search" />
          </Form.Item>
        </Form>
        {categories.map((category) => (
          <Fragment key={category.id}>
            <Title level={3} style={{ margin: `0 ${variables.spacingS}` }}>
              {category.name}
            </Title>
            <HorizontalScrollContainer>
              {raoks
                .filter((item) => item.category === category.name)
                .map((item) => (
                  <ImageCardL item={item} key={item.id} />
                ))}
            </HorizontalScrollContainer>
          </Fragment>
        ))}
      </ListLayout>
      <BottomMenu
        buttons={[
          {
            id: 1,
            icon: <PlusOutlined />,
            onClick: () => navigate("/new"),
            text: "Add new",
          },
        ]}
      />
    </>
  );
};

export default RandomActOfKindnessList;
