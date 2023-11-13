import React from "react";
import AntdModal from "../../shared/modal";
import { Notification } from "../../../common/interfaces";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  notificationData: Notification;
}

const CheersModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  notificationData,
}) => {
  const { title, userImageUrl } = notificationData;

  const onOk = () => {
    setIsModalOpen(false);
    // API call: lets make a backend call to send a cheer message to these users
  };

  return (
    <AntdModal
      title="Cheer on others"
      modalHeight={288}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description={title}
      imageUrl={userImageUrl}
      isProfileImage
      okText="Sure!"
      cancelText="Not today"
    />
  );
};

export default CheersModal;
