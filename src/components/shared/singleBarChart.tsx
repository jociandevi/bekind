import React from "react";
import { Flexbox } from "./sharedLayouts";
import styled from "styled-components";
import Tooltip from "antd/es/tooltip";
import { darkGray, pink2 } from "../../common/variables";

const BarChart = styled.div<{
  color?: string;
  height: number;
}>`
  width: 15px;
  background-color: ${(props) => props.color ?? pink2};
  transition: 1s ease ${darkGray};
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
    >
      <BarChart height={item.value} color={color} />
    </Tooltip>
  );
};

export default SingleBarChart;
