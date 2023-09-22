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
import { useMediaQueries } from "../../common/mediaQueryHook";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const DisabledBadge = styled.div`
  && .inside {
    path {
      fill: ${variables.lightGray};
      stroke: ${variables.lightGray};
    }
  }
`;

const Image = styled.img<{
  md?: boolean;
}>`
  width: ${(props) => (props.md ? "6vw" : "12vw")};
  height: ${(props) => (props.md ? "6vw" : "12vw")};
  object-fit: cover;
  border-radius: 50%;
  margin-left: ${variables.spacingXs};
`;

const Badge: React.FC<BadgeProps> = ({ ...item }) => {
  const { enabled, icon, name, description, tooltip, necessaryActions } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { md } = useMediaQueries();
  const navigate = useNavigate();

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
              <Tooltip key={index} title={item.title} trigger={"hover"}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  md={md}
                  onClick={() => navigate(`/kindness/${item.id}`)}
                />
              </Tooltip>
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
