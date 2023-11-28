import React from "react";
import Button from "antd/es/button";
import AntdModal from "../../shared/modal";
import FireImg from "../../../img/fire.png";
import Loading from "../../shared/loading";
import { useSelector } from "react-redux";
import { selectUserStreak } from "../../../redux/selectors";
import { pink1 } from "../../../common/variables";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const onCheers = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const goToLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
    navigate("/login");
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
      imageBackgroundColor={pink1}
      footer={
        <>
          <Button type={userName ? "primary" : "default"} onClick={onCheers}>
            Cheers!
          </Button>
          {!userName && (
            <Button type="primary" onClick={goToLogin}>
              Go to login
            </Button>
          )}
        </>
      }
    />
  );
};

export default FeedbackModal;
