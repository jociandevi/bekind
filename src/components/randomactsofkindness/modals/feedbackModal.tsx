import React from "react";
import { Button } from "antd";
import AntdModal from "../../shared/modal";
import FireImg from "../../../img/fire.png";

interface Props {
  userName?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const FeedbackModal: React.FC<Props> = ({
  userName,
  isModalOpen,
  setIsModalOpen,
}) => {
  const onCheers = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <AntdModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={
        userName
          ? `Nice job, ${userName}! That's a 5-day Streak!`
          : "Nice job! Login to keep track of your streak!"
      }
      description="Thank you for making the world a better place!"
      imageUrl={FireImg}
      footer={
        <Button type="primary" onClick={onCheers}>
          Cheers!
        </Button>
      }
    />
  );
};

export default FeedbackModal;
