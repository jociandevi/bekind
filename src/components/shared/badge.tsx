import React, { useState } from "react";
import { CenterAlignedFlexboxCol, TextDisplayS } from "./sharedLayouts";
import styled from "styled-components";
import { BadgeProps } from "../../common/interfaces";
import Tooltip from "antd/es/tooltip";
import BadgeModal from "../randomactsofkindness/modals/badgeModal";
import { badgeIcons } from "../../common/mockData";
import { lightGray } from "../../common/variables";

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${lightGray};
      stroke: ${lightGray};
    }
  }
`;

interface Props {
  achieved?: boolean;
  item: BadgeProps;
}

const Badge: React.FC<Props> = ({ achieved, item }) => {
  const { name, tooltip, id } = item;
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
        {achieved ? (
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
