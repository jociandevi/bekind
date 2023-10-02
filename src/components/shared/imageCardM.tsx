import React from "react";
import {
  CenterAlignedFlexbox,
  FlexboxCol,
  ResponsiveImageMedium,
  StyledText,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { Button, Tooltip } from "antd";
import { useMediaQueries } from "../../common/mediaQueryHook";
import { KindnessAction } from "../../common/interfaces";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  display: flex;
  margin-bottom: ${variables.spacingS};
  max-height: 30vw;
`;

interface Props {
  item: KindnessAction;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
}

const ImageCardL: React.FC<Props> = ({ item, onPick, isPickEnabled }) => {
  const { md } = useMediaQueries();
  const navigate = useNavigate();

  const cardAreaClicked = () => {
    navigate(`/kindness/${item.id}`);
  };

  return (
    <CardContainer onClick={cardAreaClicked}>
      <ResponsiveImageMedium src={item.imageUrl} alt={item.title} md={md} />
      <FlexboxCol style={{ width: "30vw", padding: "15px" }}>
        <Title level={5} style={{ fontSize: "14px", margin: 0 }}>
          {item.title}
        </Title>
        {md && (
          <StyledText color={variables.middleGray} fontSize="12px">
            {item.description}
          </StyledText>
        )}
      </FlexboxCol>
      <CenterAlignedFlexbox style={{ paddingRight: variables.spacingXs }}>
        {isPickEnabled ? (
          <Button onClick={(e) => onPick(e, item)}>Pick</Button>
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
      </CenterAlignedFlexbox>
    </CardContainer>
  );
};

export default ImageCardL;
