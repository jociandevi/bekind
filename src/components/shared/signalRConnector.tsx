import React, { useEffect, useState } from "react";
import useSignalR from "../../hooks/useSignalR";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/selectors";
import BadgeAchievedModal from "../randomactsofkindness/modals/badgeAchievedModal";
import { Notification } from "../../common/interfaces";
import CheersModal from "../randomactsofkindness/modals/cheersModal";
import { useGetApi } from "../../common/apiCalls";
import { setToken } from "../../common/auth.reducer";

const SignalRConnector: React.FC = () => {
  const storedToken = useSelector(selectToken);
  const [currentToken, setCurrentToken] = useState(storedToken);
  const hubConnection = useSignalR(
    `https://bekind-api.azurewebsites.net/notificationhub?access_token=${currentToken}`
  );
  const [notificationData, setNotificationData] = useState<Notification>();
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isCheersModalOpen, setIsCheersModalOpen] = useState(false);
  const { callGetApi } = useGetApi(`api/Auth/GetNotificationHubToken`);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await callGetApi();
      dispatch(setToken(response?.data));
      setCurrentToken(response?.data);
    }
    fetchData();
  }, [callGetApi, dispatch]);

  useEffect(() => {
    if (!currentToken) {
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
          case 2:
            setIsCheersModalOpen(true);
            break;
        }
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceiveNotification");
      }
    };
  }, [hubConnection, currentToken]);

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
      {notificationData &&
        (notificationData.notificationType === 1 ||
          notificationData.notificationType === 2) && (
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
