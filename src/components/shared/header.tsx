import React from "react";
import { Flexbox } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const StyledHeader = styled(Flexbox)`
  width: 100vw;
  justify-content: space-between;

  > button,
  > div {
    margin: ${variables.spacingXs};
  }
`;

const Header: React.FC<Props> = ({ left, right }) => {
  return (
    <StyledHeader>
      {left ?? <div style={{ width: variables.spacingXs }} />}
      {right ?? <div style={{ width: variables.spacingXs }} />}
    </StyledHeader>
  );
};

export default Header;
