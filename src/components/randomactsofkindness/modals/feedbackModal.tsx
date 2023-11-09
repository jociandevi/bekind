import React from "react";
import Button from "antd/es/button";
import AntdModal from "../../shared/modal";
import FireImg from "../../../img/fire.png";
import { variables } from "../../../common/variables";
import Loading from "../../shared/loading";
import { useSelector } from "react-redux";
import { selectUserStreak } from "../../../redux/selectors";

interface Props {
  userName?: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  loading?: boolean;
}

const FeedbackModal: React.FC<Props> = ({
  userName,
  isModalOpen,
  setIsModalOpen,
  loading,
}) => {
  const userStreak = useSelector(selectUserStreak);
  const onCheers = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AntdModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalHeight={292}
      title={
        userName
          ? `Nice job, ${userName}! That's a ${userStreak}-day Streak!`
          : "Nice job! Login to keep track of your streak!"
      }
      description="Thank you for making the world a better place!"
      imageUrl={FireImg}
      imageBackgroundColor={variables.pink1}
      footer={
        <Button type="primary" onClick={onCheers}>
          Cheers!
        </Button>
      }
    />
  );
};

export default FeedbackModal;
