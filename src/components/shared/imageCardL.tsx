import React, { useState } from "react";
import { Flexbox, IconButton, StyledText } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button } from "antd";
import { CaretRightOutlined, HeartFilled } from "@ant-design/icons";
import AntdModal from "./modal";
import GrowthImage from "../../img/growth.png";
import FireImg from "../../img/fire.png";
import Title from "antd/es/typography/Title";

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
  border-radius: ${variables.borderRadius}px;
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
  border-radius: ${variables.borderRadius}px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const OverlayIconButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
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
    setIsFeedbackModalOpen(true);
  };

  const onPlay = () => {
    // lets ask the user if this is today's challenge
    setIsModalOpen(true);
  };

  return (
    <CardContainer>
      <AntdModal
        title="Pick this challenge?"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onOk={handleOk}
        description="Are you picking this kindness for today?"
        imageUrl={GrowthImage}
        okText="Yes, let's go!"
      />

      <AntdModal
        isModalOpen={isFeedbackModalOpen}
        setIsModalOpen={setIsFeedbackModalOpen}
        title="Nice job, Lisa! That's a 5-day Streak!"
        description="Thank you for making the world a better place!"
        imageUrl={FireImg}
        footer={
          <Button type="primary" onClick={() => setIsFeedbackModalOpen(false)}>
            Continue
          </Button>
        }
      />
      <ImageContainer>
        <Image src={item.imageUrl} alt={item.title} />
        <OverlayIconButton
          backgroundcolor={variables.pink3}
          icon={<HeartFilled />}
          shape="circle"
        />
      </ImageContainer>

      <Title level={5} style={{ margin: "15px 0 0" }}>
        {item.title}
      </Title>
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
