import React from "react";
import { Flexbox, FlexboxCol, StyledText } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { userStats } from "../../common/mockData";
import SingleBarChart from "./singleBarChart";

const LegendContainer = styled.div`
  position: absolute;
  top: 0;
`;

const ColorIndicator = styled.div<{ color?: string }>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => props.color ?? variables.pink2};
  border-radius: 3px;
  margin-right: ${variables.spacingXxs};
`;

const ColorAndTextContainer = styled(Flexbox)`
  justify-content: flex-start;
  align-items: center;
`;

const GroupedBarChart: React.FC = () => {
  const { historicalData } = userStats;

  const uniqueLabels = new Set<string>();
  const uniqueMonths = new Set<string>();

  historicalData.forEach((item) => {
    uniqueLabels.add(item.label);
    uniqueMonths.add(item.month);
  });

  const labels = Array.from(uniqueLabels);
  const months = Array.from(uniqueMonths);
  const colors = [variables.pink2, variables.lightGray];

  const getColor = (label: string) => {
    const index = labels.findIndex((item) => item === label);
    return colors[index];
  };

  const getItem = (label: string, month: string) => {
    const data = historicalData.find(
      (item) => item.label === label && item.month === month
    );
    return data!;
  };

  return (
    <Flexbox
      style={{
        justifyContent: "space-between",
        margin: `${variables.spacingS} 0`,
      }}
    >
      <LegendContainer>
        {labels.map((item, index) => (
          <ColorAndTextContainer key={index}>
            <ColorIndicator color={colors[index]} />
            <StyledText color={variables.middleGray} fontSize="12px">
              {item}
            </StyledText>
          </ColorAndTextContainer>
        ))}
      </LegendContainer>
      {months.map((month, index) => (
        <FlexboxCol key={index}>
          <Flexbox style={{ justifyContent: "center" }}>
            {labels.map((label, index) => (
              <SingleBarChart
                item={getItem(label, month)}
                color={getColor(label)}
                key={index}
              />
            ))}
          </Flexbox>
          <StyledText color={variables.middleGray} fontSize="12px">
            {month}
          </StyledText>
        </FlexboxCol>
      ))}
    </Flexbox>
  );
};

export default GroupedBarChart;
