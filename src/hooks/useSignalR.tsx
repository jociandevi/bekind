import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection>();

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
  }, [hubUrl]);

  return connection;
};

export default useSignalR;
