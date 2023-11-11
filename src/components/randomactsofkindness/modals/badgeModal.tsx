import React from "react";
import Text from "antd/es/typography/Text";
import AntdModal from "../../shared/modal";
import { CenterAlignedFlexbox } from "../../shared/sharedLayouts";
import { BadgeProps } from "../../../common/interfaces";
import NecessaryAction from "./necessaryAction";
import { lightGray } from "../../../common/variables";

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
      imageBackgroundColor={lightGray}
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
