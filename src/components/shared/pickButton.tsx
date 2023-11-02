import React, { useContext, useState } from "react";
import { variables } from "../../common/variables";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { KindnessAction } from "../../common/interfaces";
import { glowingStyle } from "./userJourney";
import { usePostApi } from "../../common/apiCalls";
import ConfirmModal from "../randomactsofkindness/modals/confirmModal";
import FeedbackModal from "../randomactsofkindness/modals/feedbackModal";
import { useDispatch, useSelector } from "react-redux";
import { setDailyDone, setUserStreak } from "../../common/auth.reducer";
import { selectDailyIsDone, selectUserStreak } from "../../redux/selectors";
import { AuthContext } from "../../common/authProvider";

const DisabledButton = styled(Button)`
  color: ${variables.middleGray};
  background-color: ${variables.lightGray};
  box-shadow: none;
  opacity: 0.5;
`;

interface Props {
  item: KindnessAction;
}

const PickButton: React.FC<Props> = ({ item }) => {
  const { user } = useContext(AuthContext);
  const dailyIsDone = useSelector(selectDailyIsDone);
  const userStreak = useSelector(selectUserStreak);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const {
    callPostApi: callPostKindnessHistory,
    error: errorPostKindnessHistory,
  } = usePostApi(`api/KindnessHistory/${item?.id}`);
  const dispatch = useDispatch();

  const isGlowing = false;

  const onDisabledPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const onPick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(true);
    // completeUserJourney();
  };

  const onConfirmOk = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsConfirmModalOpen(false);
    callPostKindnessHistory();
    if (!errorPostKindnessHistory) {
      setIsFeedbackModalOpen(true);
      dispatch(setDailyDone(true));
      const newStreak = userStreak ? userStreak + 1 : 0;
      dispatch(setUserStreak(newStreak));
    }
  };

  return (
    <>
      {!dailyIsDone ? (
        <Button
          style={{ boxShadow: isGlowing ? glowingStyle : undefined }}
          type="primary"
          onClick={onPick}
        >
          Pick
        </Button>
      ) : (
        <Tooltip
          title="You already did your part today in making the world better!"
          trigger={"hover"}
        >
          <DisabledButton onClick={onDisabledPick}>Pick</DisabledButton>
        </Tooltip>
      )}
      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
        onOk={onConfirmOk}
      />
      <FeedbackModal
        isModalOpen={isFeedbackModalOpen}
        setIsModalOpen={setIsFeedbackModalOpen}
        userName={user?.firstName ?? undefined}
      />
    </>
  );
};

export default PickButton;
