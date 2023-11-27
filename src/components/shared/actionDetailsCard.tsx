import React, { useEffect, useState } from "react";
import {
  black,
  borderRadius,
  darkGray,
  shadow1,
  spacingS,
  spacingXs,
  veryLightGray,
  white,
} from "../../common/variables";
import styled from "styled-components";
import { KindnessAction } from "../../common/interfaces";
import { useGetApi } from "../../common/apiCalls";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import PickButton from "./pickButton";
import Text from "antd/es/typography/Text";

interface Props {
  item: KindnessAction;
}

const Card = styled.div`
  background: linear-gradient(180deg, ${white} 0%, ${veryLightGray} 100%);
  border-radius: ${borderRadius}px;
  box-shadow: ${shadow1};
  padding: ${spacingXs} ${spacingS};
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: ${spacingS};
  align-items: center;
`;

const PickButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacingS};
`;

const TitleText = styled(Text)`
  color: ${darkGray};
  font-size: 14px;
  line-height: 1.5;
`;

const Description = styled(Text)`
  color: ${black};
  font-size: 14px;
  line-height: 1.5;
`;

const ActionDetailsCard: React.FC<Props> = ({ item }) => {
  const [actionCount, setActionCount] = useState<number | undefined>();
  const { callGetApi: getActionCount } = useGetApi(
    `api/Kindness/KindnessHistoryCount/${item.id}`
  );

  useEffect(() => {
    async function fetchData() {
      const daily = await getActionCount();
      setActionCount(daily?.data);
    }
    fetchData();
  }, [getActionCount]);

  return (
    <Card>
      <Grid>
        <TitleText>Idea:</TitleText>
        <Description>{item?.title}</Description>
        <TitleText>Already done:</TitleText>
        <Description>
          <UserOutlined /> {actionCount} times
        </Description>
        <TitleText>Time it takes to do it:</TitleText>
        <Description>
          <ClockCircleOutlined /> {item.duration} minutes
        </Description>
      </Grid>
      <PickButtonContainer>
        <PickButton item={item} />
      </PickButtonContainer>
    </Card>
  );
};

export default ActionDetailsCard;
