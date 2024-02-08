import React, { useEffect, useState } from "react";
import Button from "antd/es/button";
import AntdModal from "../../shared/modal";
import { useSelector } from "react-redux";
import { selectDailyIsDone } from "../../../redux/selectors";
import { pink1 } from "../../../common/variables";
import { useNavigate } from "react-router-dom";
import { KindnessAction, Member } from "../../../common/interfaces";
import { starterActions } from "../../../common/mockData";
import PickButton from "../../shared/pickButton";
import { transformTitleToUrl } from "../../../common/util";

interface Props {
  user: Member;
  actions?: KindnessAction[];
}

const ActionSuggestionModal: React.FC<Props> = ({ user, actions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecentUser, setIsRecentUser] = useState<boolean>(false);
  const [isModalSeenToday, setIsModalSeenToday] = useState<boolean>(false);
  const [dailySuggestedAction, setDailySuggestedAction] =
    useState<KindnessAction>();
  const dailyIsDone = useSelector(selectDailyIsDone);
  const navigate = useNavigate();

  useEffect(() => {
    // check if this is a recent user
    const registeredDate = new Date(user.registeredDate);
    const currentDate = new Date();
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
    const difference = currentDate.getTime() - registeredDate.getTime();
    if (difference <= tenDaysInMilliseconds) {
      setIsRecentUser(true);
    }

    // Get action for today
    const daysSinceRegistration = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );
    const suggestion = starterActions.find(
      (action) => action.day === daysSinceRegistration
    );
    const suggestionForToday = actions?.find(
      (action) => action.id === suggestion?.actionId
    );
    setDailySuggestedAction(suggestionForToday);
  }, [user.registeredDate, actions]);

  useEffect(() => {
    const currentDate = new Date();
    const lastShownDate = localStorage.getItem("modalLastShownDate");
    const today = currentDate.toISOString().split("T")[0];
    if (!lastShownDate || lastShownDate !== today) {
      setIsModalSeenToday(false);
    } else {
      setIsModalSeenToday(true);
    }
  }, []);

  useEffect(() => {
    if (isRecentUser && !isModalSeenToday && !dailyIsDone) {
      setIsModalOpen(true);
    }
  }, [isModalSeenToday, isRecentUser, dailyIsDone]);

  const updateLocalStorage = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0];
    localStorage.setItem("modalLastShownDate", today);
  };

  const goToActionDetailPage = () => {
    const url = transformTitleToUrl(dailySuggestedAction!.title);
    navigate(`/${dailySuggestedAction!.id}/${url}`);
  };

  return (
    <AntdModal
      isModalOpen={isModalOpen}
      afterOpenChange={updateLocalStorage}
      setIsModalOpen={setIsModalOpen}
      modalHeight={292}
      title={`How about trying this: ${dailySuggestedAction?.title} today?`}
      description={dailySuggestedAction?.description}
      imageUrl={dailySuggestedAction?.imageUrl}
      imageBackgroundColor={pink1}
      footer={
        <>
          <PickButton
            item={dailySuggestedAction!}
            buttonText="Okay, let's do it!"
          />
          <Button type="default" onClick={goToActionDetailPage}>
            Read more
          </Button>
        </>
      }
    />
  );
};

export default ActionSuggestionModal;
