import React from "react";
import { Flexbox } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";

const OptionButton = styled(Button)<{ color: string }>`
  border: none;
  height: 30px;
  width: 30px;
  background-color: ${(props) => props.color};
`;

const OptionsContainer = styled.div`
  margin: 0 0 ${variables.spacingM};
`;

const CustomizeOptions: React.FC = () => {
  const options = [
    {
      color: variables.pink2,
      name: "Option 1",
    },
    {
      color: variables.middleGray,
      name: "Option 2",
    },
    {
      color: variables.black,
      name: "Option 3",
    },
  ];

  return (
    <OptionsContainer>
      <Title style={{ margin: `0 0 ${variables.spacingXs}` }} level={5}>
        Customize Options
      </Title>
      <Flexbox
        style={{
          justifyContent: "flex-start",
          gap: variables.spacingXxs,
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
