import React from "react";
import { FlexboxCol, TextDisplayS } from "./sharedLayouts";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/arrow-up-svgrepo-com.svg";
import { black, borderRadius, spacingXxs } from "../../common/variables";

const CardContainer = styled.div<{
  backgroundColor?: string;
  width?: number;
  icon?: boolean;
}>`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  flex-shrink: 0;
  border-radius: ${borderRadius}px;
  padding: ${spacingXxs};
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
  color: ${(props) => props.color ?? black}};
  display: flex;
  align-items: center;
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
          {compareChange && "%"}
        </NumberDisplay>
        <TextDisplayS color={secondaryColor}>{text}</TextDisplayS>
      </NumberTextContainer>
      {!iconToTop && icon && icon}
    </CardContainer>
  );
};

export default StatsCard;
