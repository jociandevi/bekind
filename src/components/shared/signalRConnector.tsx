import React, { useEffect } from "react";
import useSignalR from "../../hooks/useSignalR";

const SignalRConnector: React.FC = () => {
  const hubConnection = useSignalR(
    "https://bekind-api.azurewebsites.net/notificationhub"
  );

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveNotification", (message: string) => {
        console.log("Notification received: ", message);
        // congratulation modal for the badge
        // Update this MemberBadge with a PUT to enable it for user
      });
    }

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceiveNotification");
      }
    };
  }, [hubConnection]);

  return <></>;
};

export default SignalRConnector;
