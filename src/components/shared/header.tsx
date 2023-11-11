import React from "react";
import { Flexbox } from "./sharedLayouts";
import styled from "styled-components";
import { spacingXs } from "../../common/variables";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const StyledHeader = styled(Flexbox)`
  width: 100vw;
  justify-content: space-between;

  > button,
  > div {
    margin: ${spacingXs};
  }
`;

const Header: React.FC<Props> = ({ left, right }) => {
  return (
    <StyledHeader>
      {left ?? <div style={{ width: spacingXs }} />}
      {right ?? <div style={{ width: spacingXs }} />}
    </StyledHeader>
  );
};

export default Header;
