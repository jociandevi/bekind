import React, { useState } from "react";
import { Flexbox, ResponsiveImage, StyledText } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import AntdModal from "./modal";
import GrowthImage from "../../img/growth.png";
import FireImg from "../../img/fire.png";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";

const CardContainer = styled.div<{
  md?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: ${(props) => (props.md ? "20vw" : "40vw")};
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
`;

const PaddingContainer = styled.div`
  padding: 0 ${variables.spacingXs};
`;

const ImageContainer = styled.div`
  position: relative;
`;

const OverlayIconButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: ${variables.white};
  background: none;
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
}

const ImageCardL: React.FC<Props> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { md } = useMediaQueries();

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
    <CardContainer md={md}>
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
            Cheers!
          </Button>
        }
      />
      <ImageContainer>
        <ResponsiveImage
          src={item.imageUrl}
          alt={item.title}
          md={md}
          biggerImage="40vw"
          smImage="20vw"
        />
        <OverlayIconButton icon={<HeartFilled />} shape="circle" />
      </ImageContainer>
      <PaddingContainer>
        <Title level={5} style={{ margin: "15px 0 0" }}>
          {item.title}
        </Title>
        <StyledText color={variables.middleGray} fontSize="14px">
          {item.description}
        </StyledText>
        <Flexbox style={{ margin: `${variables.spacingXxs} 0` }}>
          <Button type="primary" onClick={onPlay}>
            Pick
          </Button>
        </Flexbox>
      </PaddingContainer>
    </CardContainer>
  );
};

export default ImageCardL;
