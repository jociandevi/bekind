import React, { useEffect } from "react";
import useSignalR from "../../hooks/useSignalR";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/selectors";

const SignalRConnector: React.FC = () => {
  const token = useSelector(selectToken);
  const hubConnection = useSignalR(
    `https://bekind-api.azurewebsites.net/notificationhub?access_token=${token}`
  );

  useEffect(() => {
    if (!token) {
      return;
    }
    if (hubConnection) {
      hubConnection.on("ReceiveNotification", (message: string) => {
        console.log("Notification received: ", message);
        // get message type
        // congratulation modal for the badge
        // Update this MemberBadge with a PUT to enable it for user
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceiveNotification");
      }
    };
  }, [hubConnection, token]);

  return <></>;
};

export default SignalRConnector;
