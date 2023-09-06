import React from "react";
import { CenterAlignedFlexboxCol, TextDisplayS } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { BadgeProps } from "../../common/interfaces";

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${variables.lightGray};
      stroke: ${variables.lightGray};
    }
  }
`;

const Badge: React.FC<BadgeProps> = ({ icon, enabled, id, name }) => {
  return (
    <CenterAlignedFlexboxCol>
      {enabled ? <div>{icon}</div> : <DisabledBadge>{icon}</DisabledBadge>}
      <TextDisplayS>{name}</TextDisplayS>
    </CenterAlignedFlexboxCol>
  );
};

export default Badge;
