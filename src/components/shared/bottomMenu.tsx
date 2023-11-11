import React from "react";
import { CenterAlignedFlexbox, FlexboxCol, StyledText } from "./sharedLayouts";
import Button from "antd/es/button";
import styled from "styled-components";
import {
  white,
  lightGray,
  pink3,
  darkGray,
  middleGray,
} from "../../common/variables";

const StyledBottomMenu = styled.div`
  width: 100vw;
  height: 70px;
  background-color: ${white};
  position: fixed;
  bottom: 0;

  &:before {
    content: "";
    width: 90vw;
    height: 1px;
    background: ${lightGray};
    position: absolute;
    margin-right: 5vw;
    margin-left: 5vw;
  }
`;

const MenuButton = styled(Button)<{ color?: string }>`
  color: ${darkGray};

  &:hover,
  &:focus,
  &:active {
    color: ${white} !important;
    background-color: ${(props) => props.color ?? pink3};
    border-color: ${(props) => props.color ?? pink3} !important;
  }
`;

interface MenuButtonProps {
  id: number;
  icon: React.ReactNode;
  text?: string;
  onClick: () => void;
}

interface Props {
  activeButtonColor?: string;
  buttons: MenuButtonProps[];
}

const BottomMenu: React.FC<Props> = ({ activeButtonColor, buttons }) => {
  return (
    <StyledBottomMenu>
      <CenterAlignedFlexbox>
        {buttons.map((button) => (
          <FlexboxCol key={button.id} style={{ alignItems: "center" }}>
            <MenuButton
              icon={button.icon}
              shape="circle"
              onClick={button.onClick}
              color={activeButtonColor}
            />
            <StyledText color={middleGray} fontSize="12px">
              {button.text}
            </StyledText>
          </FlexboxCol>
        ))}
      </CenterAlignedFlexbox>
    </StyledBottomMenu>
  );
};

export default BottomMenu;
