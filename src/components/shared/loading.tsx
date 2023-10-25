import React from "react";
import { Flexbox } from "./sharedLayouts";
import styled from "styled-components";
import { Spin } from "antd";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const StyledHeader = styled(Flexbox)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Loading: React.FC<Props> = ({ left, right }) => {
  return (
    <StyledHeader>
      <Spin />
    </StyledHeader>
  );
};

export default Loading;
