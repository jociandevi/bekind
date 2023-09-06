import React from "react";
import { Flexbox } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { userStats } from "../../common/mockData";

const BarChart = styled.div<{
  color?: string;
  height: number;
  marginRight?: string;
}>`
  width: 15px;
  background-color: ${(props) => props.color ?? variables.pink2};
  transition: ${variables.darkGray} 1s ease;
  cursor: pointer;
  height: ${(props) => `${props.height * 10}px` ?? "100px"};
  margin-right: ${(props) => `${props.marginRight}`};
`;

const GroupedBarChart: React.FC = () => {
  const userBars = userStats.userMonthlyStatsLast6Months;
  const avgBars = userStats.avgMonthlyStatsLast6Months;
  const mix = [];
  for (let i = 0; i < userBars.length; i++) {
    mix.push(userBars[i]);
    mix.push(avgBars[i]);
  }

  return (
    <Flexbox
      style={{
        justifyContent: "space-around",
        margin: `${variables.spacingS} 0`,
      }}
    >
      {mix.map((item, index) => (
        <BarChart
          key={index}
          height={item}
          color={index % 2 === 0 ? variables.pink2 : variables.lightGray}
          marginRight={index % 2 === 0 ? "0px" : "auto"}
        />
      ))}
    </Flexbox>
  );
};

export default GroupedBarChart;
