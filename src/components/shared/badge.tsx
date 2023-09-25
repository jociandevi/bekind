import React, { useState } from "react";
import { CenterAlignedFlexboxCol, TextDisplayS } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { BadgeProps } from "../../common/interfaces";
import { Tooltip } from "antd";
import BadgeModal from "../randomactsofkindness/modals/badgeModal";

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${variables.lightGray};
      stroke: ${variables.lightGray};
    }
  }
`;

const Badge: React.FC<BadgeProps> = ({ ...item }) => {
  const { enabled, icon, name, tooltip } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BadgeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={item}
      />
      <CenterAlignedFlexboxCol>
        {enabled ? (
          <div onClick={() => setIsModalOpen(true)}>{icon}</div>
        ) : (
          <Tooltip title={tooltip}>
            <DisabledBadge>{icon}</DisabledBadge>
          </Tooltip>
        )}
        <TextDisplayS>{name}</TextDisplayS>
      </CenterAlignedFlexboxCol>
    </>
  );
};

export default Badge;
