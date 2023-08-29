import React from "react";
import { FlexboxCol } from "../shared/sharedLayouts";
import { variables } from "../shared/variables";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/arrow-up-svgrepo-com.svg";

const CardContainer = styled.div<{
  backgroundColor?: string;
  width?: number;
  icon?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: 15px;
  padding: ${variables.spacingXxs};
  padding-bottom: ${(props) => (props.icon ? 0 : "15px")}};
  display: flex;
  flex-direction: column;
  margin: 6px;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width + "%"}};
  align-items: center;
  justify-content: space-around;
`;

const NumberTextContainer = styled(FlexboxCol)`
  text-align: center;
  align-items: center;
`;

const NumberDisplay = styled.div<{ color?: string }>`
  font-size: 20px;
  color: ${(props) => props.color ?? variables.black}};
  display: flex;
  align-items: center;
`;

const TextDisplay = styled.div<{ color?: string }>`
  font-size: 10px;
  color: ${(props) => props.color ?? variables.black}};
`;

interface Props {
  backgroundColor: string;
  number: number;
  text: string;
  compareChange?: boolean;
  iconToTop?: boolean;
  color?: string;
  secondaryColor?: string;
  width?: number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<Props> = ({
  backgroundColor,
  number,
  text,
  width,
  compareChange,
  color,
  secondaryColor,
  icon,
  iconToTop,
}) => {
  const comparationGoingUp = number >= 0;

  return (
    <CardContainer
      backgroundColor={backgroundColor}
      width={width}
      icon={icon !== undefined && !iconToTop}
    >
      {iconToTop && icon && icon}
      <NumberTextContainer>
        <NumberDisplay color={color}>
          {compareChange && (
            <Arrow
              stroke={color}
              width={18}
              height={18}
              style={{ rotate: comparationGoingUp ? "0deg" : "180deg" }}
            />
          )}
          {Math.floor(Math.abs(number))}
        </NumberDisplay>
        <TextDisplay color={secondaryColor}>{text}</TextDisplay>
      </NumberTextContainer>
      {!iconToTop && icon && icon}
    </CardContainer>
  );
};

export default StatsCard;
