import React from "react";
import { Tooltip, Typography } from "antd";
import AntdModal from "../../shared/modal";
import styled from "styled-components";
import { useMediaQueries } from "../../../common/mediaQueryHook";
import { variables } from "../../../common/variables";
import { CenterAlignedFlexbox } from "../../shared/sharedLayouts";
import { useNavigate } from "react-router-dom";
import { BadgeProps } from "../../../common/interfaces";

const { Text } = Typography;

interface Props {
  item: BadgeProps;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const Image = styled.img<{
  md?: boolean;
}>`
  width: ${(props) => (props.md ? "6vw" : "12vw")};
  height: ${(props) => (props.md ? "6vw" : "12vw")};
  object-fit: cover;
  border-radius: 50%;
  margin-left: ${variables.spacingXs};
`;

const BadgeModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, item }) => {
  const { md } = useMediaQueries();
  const navigate = useNavigate();
  const { icon, name, description, necessaryActions } = item;

  return (
    <AntdModal
      title={name}
      modalHeight={298}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={() => setIsModalOpen(false)}
      description={description}
      imageBackgroundColor={variables.lightGray}
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
  );
};

export default BadgeModal;
