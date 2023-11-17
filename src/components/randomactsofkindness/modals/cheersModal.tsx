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
  const header =
    notificationData.notificationType === 1
      ? "Cheer on others"
      : "You got cheered on!";
  const okText = notificationData.notificationType === 1 ? "Sure!" : "Cool!";
  const cancelText =
    notificationData.notificationType === 1 ? "Not today!" : undefined;

  const onOk = () => {
    setIsModalOpen(false);
  };

  return (
    <AntdModal
      title={header}
      modalHeight={288}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onOk={onOk}
      description={title}
      imageUrl={userImageUrl}
      isProfileImage
      okText={okText}
      cancelText={cancelText}
    />
  );
};

export default CheersModal;
