import React from "react";
import AntdModal from "../../shared/modal";
import GrowthImage from "../../../img/growth.png";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onOk: (event: React.MouseEvent<HTMLElement>) => void;
}

const ConfirmModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onOk,
}) => {
  return (
    <AntdModal
      title="Pick this challenge?"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description="Are you picking this kindness for today?"
      imageUrl={GrowthImage}
      okText="Yes, let's go!"
    />
  );
};

export default ConfirmModal;
