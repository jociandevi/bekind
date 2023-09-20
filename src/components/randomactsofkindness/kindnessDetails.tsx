import React, { useContext } from "react";
import {
  FlexboxCol,
  ImageContainer,
  ImageSizeL,
  StyledText,
} from "../shared/sharedLayouts";
import { Button } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { raoks } from "../../common/mockData";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { AuthContext } from "../../common/authProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  HeartFilled,
  ArrowLeftOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import UserProfileIcon from "../shared/userProfileIcon";
import CustomizeOptions from "../shared/customizeOptions";
import Article from "../shared/article";

const MarginContainer = styled(FlexboxCol)`
  margin: ${variables.spacingM};
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

const ItemDetailPagePrimaryBtn = styled(Button)`
  border-radius: 25vw 0 0 0;
  width: 50vw;
  background: ${variables.black};
  color: white;
  position: fixed;
  bottom: 0;
  right: 0;
`;

const KindnessDetails: React.FC = () => {
  const params = useParams();
  const { md } = useMediaQueries();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // API: GET /kindness/:id >> get kindness with this id

  const kindness = raoks.find((item) => item.id.toString() === params.id)!;

  const options = true;

  return (
    <FlexboxCol>
      <ImageContainer>
        <ImageSizeL
          src={kindness?.imageUrl}
          alt={`Image of ${kindness?.title}`}
          md={md}
        />
        <OverlayBackButton
          icon={<ArrowLeftOutlined />}
          shape="circle"
          onClick={() => navigate("/kindness")}
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
          <ClockCircleOutlined /> 5 min
        </HighlightedTitle>
        <Title style={{ margin: `0 0 ${variables.spacingM}` }} level={4}>
          {kindness.title}
        </Title>
        {options && <CustomizeOptions />}
        <StyledText color={variables.middleGray} fontSize="14px">
          {kindness.description}
        </StyledText>
        <Article article={kindness.article} />
      </MarginContainer>
      <ItemDetailPagePrimaryBtn>+ Pick</ItemDetailPagePrimaryBtn>
    </FlexboxCol>
  );
};

export default KindnessDetails;
