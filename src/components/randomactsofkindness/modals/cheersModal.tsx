import React from "react";
import AntdModal from "../../shared/modal";

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

  const testurl =
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <AntdModal
      title="Cheer on others"
      modalHeight={288}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description="Sean just bought a coffee for the person next in line! Want to high five him?"
      imageUrl={testurl}
      isProfileImage
      okText="Sure!"
      cancelText="Not today"
    />
  );
};

export default CheersModal;
