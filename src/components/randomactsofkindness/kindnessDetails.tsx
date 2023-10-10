import React, { useContext, useState } from "react";
import {
  FlexboxCol,
  ImageContainer,
  StyledText,
} from "../shared/sharedLayouts";
import { Button } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { raoks } from "../../common/mockData";
import { lgBreakPoint, mdBreakPoint } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  HeartFilled,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserProfileIcon from "../shared/userProfileIcon";
import CustomizeOptions from "../shared/customizeOptions";
import Article from "../shared/article/article";
import ConfirmModal from "./modals/confirmModal";
import FeedbackModal from "./modals/feedbackModal";
import InstallButton from "../shared/pwaCustomInstalls/installButton";

const MarginContainer = styled(FlexboxCol)`
  margin: ${variables.spacingM} auto;
  width: 90vw;
  @media only screen and ${mdBreakPoint} {
    width: inherit;
  }
`;

const OverlayBackButton = styled(Button)`
  position: absolute;
  top: ${variables.spacingL};
  left: ${variables.spacingM};
  color: ${variables.white};
  background-color: #1816188c;
`;

const OverlayHeartButton = styled(Button)`
  position: absolute;
  bottom: -${variables.spacingXs};
  right: ${variables.spacingM};
  color: ${variables.pink3};
  background-color: ${variables.white};
  box-shadow: ${variables.shadow1};
`;

const OverlayProfileContainer = styled.div`
  position: absolute;
  top: ${variables.spacingL};
  right: ${variables.spacingM};

  & button {
    padding: 0;
    background-color: transparent;
  }
`;

const HighlightedTitle = styled(Title)`
  color: ${variables.pink3};
`;

export const ArticleImage = styled.img`
  width: 100vw;
  @media only screen and ${mdBreakPoint} {
    width: 75vw;
  }
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
  }
  height: ${50 / 1.618}vw;
  border-radius: 0;
  object-fit: cover;
`;

const KindnessDetails: React.FC = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isPickEnabled, setIsPickEnabled] = useState(true);

  // API: GET /kindness/:id >> get kindness with this id

  // API: GET /kindnessHistory/:id/count >> get total number of times this kindness has been done
  const totalTimesDone = 110;

  const kindness = raoks.find((item) => item.id.toString() === params.id)!;

  const options = false;

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
    <FlexboxCol>
      <ImageContainer style={{ margin: "0 auto" }}>
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
        <ArticleImage
          src={kindness?.imageUrl}
          alt={`Image of ${kindness?.title}`}
        />
        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate(-1)}
        />
        <OverlayHeartButton icon={<HeartFilled />} shape="circle" />
        {user && (
          <OverlayProfileContainer>
            <UserProfileIcon user={user} />
          </OverlayProfileContainer>
        )}
      </ImageContainer>
      <MarginContainer>
        <HighlightedTitle
          style={{ margin: 0, color: variables.pink3 }}
          level={2}
        >
          <UserOutlined />
          {totalTimesDone}
        </HighlightedTitle>
        <Title style={{ margin: `0 0 0.5em` }} level={4}>
          {kindness.title}
        </Title>
        {options && <CustomizeOptions />}
        <StyledText color={variables.middleGray} fontSize="14px">
          {kindness.description}
        </StyledText>
        <Article
          item={kindness}
          onPick={onPick}
          isPickEnabled={isPickEnabled}
        />
      </MarginContainer>
      <InstallButton />
    </FlexboxCol>
  );
};

export default KindnessDetails;
