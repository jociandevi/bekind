import React from "react";
import { Flexbox, FlexboxCol, StyledText } from "../shared/sharedLayouts";
import { Button } from "antd";
import { variables } from "../shared/variables";
import styled from "styled-components";

const StyledBottomMenu = styled.div`
  width: 100vw;
  height: 70px;
  background-color: ${variables.white};
  position: fixed;
  bottom: 0;

  &:before {
    content: "";
    width: 90vw;
    height: 1px;
    background: ${variables.lightGray};
    position: absolute;
    margin-right: 5vw;
    margin-left: 5vw;
  }
`;

const CenterAlignedFlexbox = styled(Flexbox)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: inherit;
`;

const MenuButton = styled(Button)`
  color: ${variables.darkGray};

  &:hover,
  &:focus,
  &:active {
    color: ${variables.white} !important;
    background-color: ${variables.pink3};
  }
`;

interface MenuButtonProps {
  id: number;
  icon: React.ReactNode;
  text?: string;
  onClick: () => void;
}

interface Props {
  buttonColor?: string;
  activeButtonColor?: string;
  buttons: MenuButtonProps[];
}

const BottomMenu: React.FC<Props> = ({
  buttonColor,
  activeButtonColor,
  buttons,
}) => {
  return (
    <StyledBottomMenu>
      <CenterAlignedFlexbox>
        {buttons.map((button) => (
          <FlexboxCol key={button.id} style={{ alignItems: "center" }}>
            <MenuButton
              icon={button.icon}
              shape="circle"
              onClick={button.onClick}
            />
            <StyledText color={variables.middleGray} fontSize="12px">
              {button.text}
            </StyledText>
          </FlexboxCol>
        ))}
      </CenterAlignedFlexbox>
    </StyledBottomMenu>
  );
};

export default BottomMenu;
