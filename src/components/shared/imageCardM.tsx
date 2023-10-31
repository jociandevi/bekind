import React, { useEffect, useState } from "react";
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
import { KindnessAction, KindnessHistory } from "../../common/interfaces";
import { useNavigate } from "react-router-dom";
import { transformTitleToUrl } from "../../common/util";
import { useGetApi } from "../../common/apiCalls";
import Loading from "./loading";

const CardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: ${variables.borderRadius}px;
  display: flex;
  margin-bottom: ${variables.spacingS};
  max-height: 30vw;
`;

interface Props {
  item?: KindnessHistory | number;
  onPick: (event: React.MouseEvent<HTMLElement>, item: KindnessAction) => void;
  isPickEnabled: boolean;
}

const isKindnessHistory = (
  item: KindnessHistory | number
): item is KindnessHistory => {
  return (item as KindnessHistory).kindnessId !== undefined;
};

const ImageCardM: React.FC<Props> = ({ item, onPick, isPickEnabled }) => {
  const { md } = useMediaQueries();
  const navigate = useNavigate();
  let id;
  if (item) {
    if (isKindnessHistory(item)) {
      id = item.kindnessId;
    } else {
      id = item;
    }
  }
  const { callGetApi, loading } = useGetApi(`api/Kindness/${id}`);
  const [kindness, setKindness] = useState<KindnessAction | undefined>();

  useEffect(() => {
    async function fetchData() {
      const response = await callGetApi();
      setKindness(response?.data);
    }
    fetchData();
  }, [callGetApi]);

  const cardAreaClicked = () => {
    const url = transformTitleToUrl(kindness!.title);
    navigate(`/${kindness?.id}/${url}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CardContainer onClick={cardAreaClicked}>
      <ResponsiveImageMedium
        src={kindness?.imageUrl}
        alt={kindness?.title}
        md={md}
      />
      <FlexboxCol style={{ width: "30vw", padding: "15px" }}>
        <Title level={5} style={{ fontSize: "14px", margin: 0 }}>
          {kindness?.title}
        </Title>
        {md && (
          <StyledText color={variables.middleGray} fontSize="12px">
            {kindness?.description}
          </StyledText>
        )}
      </FlexboxCol>
      <CenterAlignedFlexbox style={{ paddingRight: variables.spacingXs }}>
        {isPickEnabled ? (
          <Button onClick={(e) => onPick(e, kindness!)}>Pick</Button>
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

export default ImageCardM;
