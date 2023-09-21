import React from "react";
import AntdModal from "../../shared/modal";
import { userToPraise } from "../../../common/mockData";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const CheersModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  // can we listen to the API call here?

  const onOk = () => {
    setIsModalOpen(false);
    // API call: lets make a backend call to send a cheer message to these users
  };

  return (
    <AntdModal
      title="Cheer on others"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description="Sean just bought a coffee for the person next in line! Want to high five him?"
      imageUrl={userToPraise.photoUrl}
      isProfileImage
      okText="Sure!"
      cancelText="Not today"
    />
  );
};

export default CheersModal;
