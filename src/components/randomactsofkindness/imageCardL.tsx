import React, { useState } from "react";
import {
  Flexbox,
  IconButton,
  StyledText,
  StyledTitle,
} from "../shared/sharedLayouts";
import { variables } from "../shared/variables";
import styled from "styled-components";
import { Button, Modal } from "antd";
import { CaretRightOutlined, HeartFilled } from "@ant-design/icons";

const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
};

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: 40vw;
  @media only screen and ${devices.md} {
    width: 15vw;
  }
  flex-shrink: 0;
  border-radius: 15px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 15px;
`;

const Image = styled.img`
  width: 40vw;
  height: 40vw;
  @media only screen and ${devices.md} {
    width: 15vw;
    height: 15vw;
  }
  object-fit: cover;
  border-radius: 15px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const OverlayIconButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledModal = styled(Modal)`
  .ant-btn-primary,
  .ant-btn-primary:not(:disabled):hover {
    background-color: ${variables.pink};
  }
`;

const StyledFeedbackModal = styled(Modal)`
  .ant-btn-primary,
  .ant-btn-primary:not(:disabled):hover {
    background-color: ${variables.pink};
  }
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
}

const ImageCardL: React.FC<Props> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);

    // todo: lets make a backend call to add this to user's profile

    // lets congratulate them on their streak
    setIsFeedbackModalOpen(true);
  };

  const handleContinue = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onPlay = () => {
    // lets ask the user if this is today's challenge
    setIsModalOpen(true);
  };

  return (
    <CardContainer>
      <StyledModal
        title="Pick this challenge?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you picking this kindness for today?</p>
      </StyledModal>
      <StyledFeedbackModal
        title="Amazing!"
        open={isFeedbackModalOpen}
        footer={
          <Button type="primary" onClick={handleContinue}>
            Continue
          </Button>
        }
      >
        <p>This is a 5 day streak!</p>
      </StyledFeedbackModal>
      <ImageContainer>
        <Image src={item.imageUrl} alt={item.title} />
        <OverlayIconButton
          backgroundcolor={variables.pink}
          icon={<HeartFilled />}
          shape="circle"
        />
      </ImageContainer>

      <StyledTitle level={5} style={{ margin: "15px 0 0" }}>
        {item.title}
      </StyledTitle>
      <StyledText color={variables.middleGray} fontSize="14px">
        {item.description}
      </StyledText>
      <Flexbox style={{ marginTop: variables.spacingXs }}>
        <IconButton
          backgroundcolor={variables.black}
          icon={<CaretRightOutlined />}
          shape="circle"
          onClick={onPlay}
        />
      </Flexbox>
    </CardContainer>
  );
};

export default ImageCardL;
