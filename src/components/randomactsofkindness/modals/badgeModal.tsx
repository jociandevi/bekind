import React from "react";
import { Typography } from "antd";
import AntdModal from "../../shared/modal";
import { variables } from "../../../common/variables";
import { CenterAlignedFlexbox } from "../../shared/sharedLayouts";
import { BadgeProps } from "../../../common/interfaces";
import NecessaryAction from "./necessaryAction";

const { Text } = Typography;

interface Props {
  item: BadgeProps;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const BadgeModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, item }) => {
  const { icon, name, description, kindnessIds } = item;

  return (
    <AntdModal
      title={name}
      modalHeight={293}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={() => setIsModalOpen(false)}
      description={description}
      imageBackgroundColor={variables.lightGray}
      image={icon}
      footer={
        <CenterAlignedFlexbox>
          <Text>Achieved by:</Text>
          <CenterAlignedFlexbox style={{ flexWrap: "wrap", maxWidth: "60%" }}>
            {kindnessIds?.map((item, index) => (
              <NecessaryAction key={index} actionId={item} />
            ))}
          </CenterAlignedFlexbox>
        </CenterAlignedFlexbox>
      }
    />
  );
};

export default BadgeModal;
