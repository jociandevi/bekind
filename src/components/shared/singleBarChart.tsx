import React from "react";
import { Flexbox } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Tooltip } from "antd";

const BarChart = styled.div<{
  color?: string;
  height: number;
}>`
  width: 15px;
  background-color: ${(props) => props.color ?? variables.pink2};
  transition: 1s ease ${variables.darkGray};
  cursor: pointer;
  height: ${(props) => `${props.height * 10}px` ?? "100px"};
  border-radius: 3px;
`;

interface Props {
  item: { month: string; label: string; value: number };
  color: string;
}

const SingleBarChart: React.FC<Props> = ({ item, color }) => {
  return (
    <Tooltip
      title={
        <Flexbox
          style={{ maxWidth: "20vw" }}
        >{`${item.label}: ${item.value}`}</Flexbox>
      }
      arrow={false}
      color={variables.middleGray}
    >
      <BarChart height={item.value} color={color} />
    </Tooltip>
  );
};

export default SingleBarChart;
