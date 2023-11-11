import React from "react";
import { Flexbox } from "./sharedLayouts";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import {
  black,
  middleGray,
  pink2,
  spacingM,
  spacingXs,
  spacingXxs,
} from "../../common/variables";

const OptionButton = styled(Button)<{ color: string }>`
  border: none;
  height: 30px;
  width: 30px;
  background-color: ${(props) => props.color};
`;

const OptionsContainer = styled.div`
  margin: 0 0 ${spacingM};
`;

const CustomizeOptions: React.FC = () => {
  const options = [
    {
      color: pink2,
      name: "Option 1",
    },
    {
      color: middleGray,
      name: "Option 2",
    },
    {
      color: black,
      name: "Option 3",
    },
  ];

  return (
    <OptionsContainer>
      <Title style={{ margin: `0 0 ${spacingXs}` }} level={5}>
        Customize Options
      </Title>
      <Flexbox
        style={{
          justifyContent: "flex-start",
          gap: spacingXxs,
        }}
      >
        {options.map((item, index) => (
          <Tooltip key={index} title={item.name}>
            <OptionButton shape="circle" size="small" color={item.color} />
          </Tooltip>
        ))}
      </Flexbox>
    </OptionsContainer>
  );
};

export default CustomizeOptions;
