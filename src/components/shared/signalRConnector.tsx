import React, { useEffect, useState } from "react";
import useSignalR from "../../hooks/useSignalR";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/selectors";
import BadgeAchievedModal from "../randomactsofkindness/modals/badgeAchievedModal";
import { Notification } from "../../common/interfaces";
import CheersModal from "../randomactsofkindness/modals/cheersModal";

const SignalRConnector: React.FC = () => {
  const token = useSelector(selectToken);
  const hubConnection = useSignalR(
    `https://bekind-api.azurewebsites.net/notificationhub?access_token=${token}`
  );
  const [notificationData, setNotificationData] = useState<Notification>();
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isCheersModalOpen, setIsCheersModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (hubConnection) {
      hubConnection.on("ReceiveNotification", (message: Notification) => {
        console.log("Notification received: ", message);
        setNotificationData(message);
        const { notificationType } = message;
        switch (notificationType) {
          case 0:
            setIsBadgeModalOpen(true);
            break;
          case 1:
            setIsCheersModalOpen(true);
            break;
        }
        // Update this MemberBadge with a PUT to enable it for user
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceiveNotification");
      }
    };
  }, [hubConnection, token]);

  if (!notificationData) {
    return null;
  }

  return (
    <>
      {notificationData && notificationData.notificationType === 0 && (
        <BadgeAchievedModal
          isModalOpen={isBadgeModalOpen}
          setIsModalOpen={setIsBadgeModalOpen}
          notificationData={notificationData}
        />
      )}
      {notificationData && notificationData.notificationType === 1 && (
        <CheersModal
          isModalOpen={isCheersModalOpen}
          setIsModalOpen={setIsCheersModalOpen}
          notificationData={notificationData}
        />
      )}
    </>
  );
};

export default SignalRConnector;
