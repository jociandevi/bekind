import React, { useContext, useState } from "react";
import {
  Flexbox,
  ImageContainer,
  ResponsiveImage,
  StyledText,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { HeartFilled } from "@ant-design/icons";
import AntdModal from "./modal";
import GrowthImage from "../../img/growth.png";
import FireImg from "../../img/fire.png";
import Title from "antd/es/typography/Title";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div<{
  md?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  width: ${(props) => (props.md ? "20vw" : "40vw")};
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  cursor: pointer;
`;

const PaddingContainer = styled.div<{
  md?: boolean;
}>`
  padding: 0 ${variables.spacingXs} ${variables.spacingXs};
  height: ${(props) => (props.md ? "20vw" : "70vw")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OverlayIconButton = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: ${variables.white};
  background-color: #1816188c;
`;

interface Props {
  item: { id: number; title: string; description?: string; imageUrl: string };
  isPickEnabled: boolean;
  setIsPickEnabled: (value: boolean) => void;
}

const ImageCardL: React.FC<Props> = ({
  item,
  isPickEnabled,
  setIsPickEnabled,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { md } = useMediaQueries();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
    // todo: lets make a backend call to add this to user's profile
    setIsFeedbackModalOpen(true);
    setIsPickEnabled(false);
  };

  const onPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // lets ask the user if this is today's challenge
    setIsModalOpen(true);
  };

  const onLike = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const cardAreaClicked = () => {
    navigate(`/kindness/${item.id}`);
  };

  const onCheers = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsFeedbackModalOpen(false);
  };

  return (
    <CardContainer md={md} onClick={cardAreaClicked}>
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
        title={
          user
            ? `Nice job, ${user.given_name}! That's a 5-day Streak!`
            : "Nice job! Login to keep track of your streak!"
        }
        description="Thank you for making the world a better place!"
        imageUrl={FireImg}
        footer={
          <Button type="primary" onClick={onCheers}>
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
        <OverlayIconButton
          icon={<HeartFilled />}
          shape="circle"
          onClick={onLike}
        />
      </ImageContainer>
      <PaddingContainer md={md}>
        <Title level={5} style={{ margin: "15px 0 0" }}>
          {item.title}
        </Title>
        <StyledText color={variables.middleGray} fontSize="14px">
          {item.description}
        </StyledText>
        <Flexbox style={{ margin: `${variables.spacingXxs} 0` }}>
          {isPickEnabled ? (
            <Button type="primary" onClick={onPick}>
              Pick
            </Button>
          ) : (
            <Tooltip
              title="You already did your part today in making the world better!"
              trigger={"hover"}
            >
              <Button type="primary" disabled>
                Pick
              </Button>
            </Tooltip>
          )}
        </Flexbox>
      </PaddingContainer>
    </CardContainer>
  );
};

export default ImageCardL;
