import React, { useState } from "react";
import { CenterAlignedFlexboxCol, TextDisplayS } from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { BadgeProps } from "../../common/interfaces";
import Tooltip from "antd/es/tooltip";
import BadgeModal from "../randomactsofkindness/modals/badgeModal";
import { badgeIcons } from "../../common/mockData";

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${variables.lightGray};
      stroke: ${variables.lightGray};
    }
  }
`;

const Badge: React.FC<BadgeProps> = ({ ...item }) => {
  const { isOwnedByMember, name, tooltip, id } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const icon = badgeIcons.find((item) => item.id === id)?.icon;

  return (
    <>
      <BadgeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={item}
      />
      <CenterAlignedFlexboxCol>
        {isOwnedByMember ? (
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
