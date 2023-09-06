import React, { Fragment, useState } from "react";
import {
  Flexbox,
  HorizontalScrollContainer,
  IconButton,
  StyledGrid,
  StyledSearch,
} from "../shared/sharedLayouts";
import { Form } from "antd";
import ImageCardL from "../shared/imageCardL";
import { useNavigate } from "react-router-dom";
import { variables } from "../../common/variables";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import AntdModal from "../shared/modal";
import BottomMenu from "../shared/bottomMenu";
import Title from "antd/es/typography/Title";
import {
  Category,
  CategoryNames,
  KindnessAction,
} from "../../common/interfaces";

export const categories: Category[] = [
  { id: 100, name: CategoryNames.SOCIAL },
  { id: 200, name: CategoryNames.ANIMAL },
  { id: 300, name: CategoryNames.ENVIRONMENT },
  { id: 400, name: CategoryNames.NEIGHBORHOOD },
];

export const raoks: KindnessAction[] = [
  {
    id: 1,
    title: "Pay it Backward",
    description: "Buy coffee for the person behind you in line",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    id: 2,
    title: "Give compliments",
    description: "Compliment the first three people you talk to today.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1662496619829-fcfa29c2d718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
  },
  {
    id: 3,
    title: "Send good vibes",
    description:
      "Send a positive text message to five different people right now.",
    category: CategoryNames.SOCIAL,
    imageUrl:
      "https://images.unsplash.com/photo-1493401415972-d4001c9fa2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 4,
    title: "Decorate with post its",
    category: CategoryNames.NEIGHBORHOOD,
    description:
      "Post inspirational sticky notes around your neighborhood, office, school, etc.",
    imageUrl:
      "https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
  },
  {
    id: 5,
    title: "Donate old towels or blankets to an animal shelter.",
    category: CategoryNames.ANIMAL,
    imageUrl:
      "https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 6,
    title: "Surprise notes",
    description:
      "Place a positive body image notes in jean pockets at a department store",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 7,
    title: "Donate",
    description: "Give away stuff for free on Craig’s List.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
  },
  {
    id: 8,
    title: "Clean it",
    description: "Have a clean up party at a beach or park.",
    category: CategoryNames.ENVIRONMENT,
    imageUrl:
      "https://images.unsplash.com/photo-1676642061313-320659a528ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 9,
    title: "Treat the doggies",
    description:
      "Purchase extra dog or cat food and bring it to an animal shelter.",
    category: CategoryNames.ANIMAL,
    imageUrl:
      "https://images.unsplash.com/photo-1508609540374-67d1601ba520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdHJlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const RandomActOfKindnessList: React.FC = () => {
  // backend sends user to praise - this API call should happen randomly in the next 10-60 seconds after user logs in
  const userToPraise = {
    id: 1,
    firstName: "Shaun",
    lastName: "Mendley",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    recent: [...raoks][0],
  };

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
      <StyledGrid>
        <AntdModal
          title="Cheer on others"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onOk={handleOk}
          description="Sean just bought a coffee for the person next in line! Want to high five him?"
          image={userToPraise.photoUrl}
          isProfileImage
          okText="Sure!"
          cancelText="Not today"
        />
        <Flexbox style={{ marginBottom: variables.spacingS }}>
          <IconButton
            backgroundcolor={variables.black}
            icon={<UserOutlined />}
            onClick={() => navigate("/profile")}
          />
        </Flexbox>

        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="search">
            <StyledSearch placeholder="Search" />
          </Form.Item>
        </Form>
        {categories.map((category) => (
          <Fragment key={category.id}>
            <Title level={3}>{category.name}</Title>
            <HorizontalScrollContainer>
              {raoks
                .filter((item) => item.category === category.name)
                .map((item) => (
                  <ImageCardL item={item} key={item.id} />
                ))}
            </HorizontalScrollContainer>
          </Fragment>
        ))}
      </StyledGrid>
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
