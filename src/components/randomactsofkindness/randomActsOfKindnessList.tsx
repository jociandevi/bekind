import React, { Fragment, useState } from "react";
import {
  Flexbox,
  HorizontalScrollContainer,
  ListLayout,
  StyledSearch,
} from "../shared/sharedLayouts";
import { Button, Form } from "antd";
import ImageCardL from "../shared/imageCardL";
import { useNavigate } from "react-router-dom";
import { variables } from "../../common/variables";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import AntdModal from "../shared/modal";
import BottomMenu from "../shared/bottomMenu";
import Title from "antd/es/typography/Title";
import { categories, raoks, userToPraise } from "../../common/mockData";
import InstallModal from "../shared/installModal";

const RandomActOfKindnessList: React.FC = () => {
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
        <InstallModal />
        <Flexbox style={{ margin: variables.spacingS }}>
          <Button
            style={{ border: "none" }}
            icon={<UserOutlined />}
            onClick={() => navigate("/profile")}
          />
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
