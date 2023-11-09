import { useCallback, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (hubUrl: string, onConnected?: () => void) => {
  const [connection, setConnection] = useState<signalR.HubConnection>();

  // Function to send initial message
  const sendInitialMessage = useCallback(
    async (conn: signalR.HubConnection) => {
      const initialMessage = { protocol: "json", version: 1 }; // Your initial message object
      const messageString = JSON.stringify(initialMessage) + "\u001E"; // Append 0x1E at the end of the message
      try {
        await conn.send(messageString);
        console.log("Initial message sent to the SignalR hub");
      } catch (err) {
        console.error("Error sending initial message", err);
      }
    },
    []
  );

  useEffect(() => {
    // Create and start the connection
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      // .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);

    const startConnection = async () => {
      try {
        await connect.start();
        console.log("Connected to SignalR hub");

        if (onConnected) {
          onConnected();
        }

        // Send initial message after establishing connection
        await sendInitialMessage(connect);
      } catch (err) {
        console.error("Error while establishing connection", err);
      }
    };

    const stopConnection = async () => {
      try {
        await connect.stop();
        console.log("Disconnected from SignalR hub");
      } catch (err) {
        console.error("Error while disconnecting", err);
      }
    };

    startConnection();

    const handlePageHide = () => stopConnection();
    const handlePageShow = () => startConnection();

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    // Clean up on component dismount and pagehide/pageshow events
    return () => {
      stopConnection();
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [hubUrl, onConnected, sendInitialMessage]);

  return connection;
};

export default useSignalR;
