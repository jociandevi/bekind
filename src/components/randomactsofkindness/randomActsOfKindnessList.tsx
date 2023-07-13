import React from "react";
import {
  HorizontalScrollContainer,
  StyledContainer,
  StyledSearch,
  StyledTitle,
} from "../shared/sharedLayouts";
import { Form } from "antd";
import ImageCardL from "./imageCardL";

const RandomActOfKindnessList: React.FC = () => {
  const onFinish = (values: any) => {
    // lets filter
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledContainer>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="search">
          <StyledSearch placeholder="Search" />
        </Form.Item>
      </Form>
      <>
        <StyledTitle level={3}>Explore</StyledTitle>
        <HorizontalScrollContainer>
          <ImageCardL
            item={{
              id: 1,
              title: "Pay it Backward",
              description: "Buy coffee for the person behind you in line",
              imageUrl:
                "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
            }}
          />
          <ImageCardL
            item={{
              id: 1,
              title: "Give compliments",
              description:
                "Compliment the first three people you talk to today.",
              imageUrl:
                "https://images.unsplash.com/photo-1662496619829-fcfa29c2d718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
            }}
          />
          <ImageCardL
            item={{
              id: 1,
              title: "Send good vibes",
              description:
                "Send a positive text message to five different people right now.",
              imageUrl:
                "https://images.unsplash.com/photo-1493401415972-d4001c9fa2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            }}
          />
          <ImageCardL
            item={{
              id: 1,
              title: "Decorate with post its",
              description:
                "Post inspirational sticky notes around your neighborhood, office, school, etc.",
              imageUrl:
                "https://images.unsplash.com/photo-1541960071727-c531398e7494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
            }}
          />
          <ImageCardL
            item={{
              id: 1,
              title: "Donate old towels or blankets to an animal shelter.",
              imageUrl:
                "https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
            }}
          />
        </HorizontalScrollContainer>
      </>
    </StyledContainer>
  );
};

export default RandomActOfKindnessList;
