import React, { useState } from "react";
import {
  CenterAlignedFlexbox,
  CenterAlignedFlexboxCol,
  TextDisplayS,
} from "./sharedLayouts";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { BadgeProps } from "../../common/interfaces";
import { Tooltip, Typography } from "antd";
import AntdModal from "./modal";

const { Text } = Typography;

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${variables.lightGray};
      stroke: ${variables.lightGray};
    }
  }
`;

const Image = styled.img`
  width: 12vw;
  height: 12vw;
  object-fit: cover;
  border-radius: 50%;
  margin-left: ${variables.spacingXs};
`;

const Badge: React.FC<BadgeProps> = ({ ...item }) => {
  const { enabled, icon, name, description, tooltip, necessaryActions } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AntdModal
        title={name}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onOk={() => setIsModalOpen(false)}
        description={description}
        image={icon}
        footer={
          <CenterAlignedFlexbox>
            <Text>Achieved by:</Text>
            {necessaryActions.map((item, index) => (
              <Image key={index} src={item.imageUrl} alt={item.title} />
            ))}
          </CenterAlignedFlexbox>
        }
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
