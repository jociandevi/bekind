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

    startConnection();

    // Clean up on dismount
    return () => {
      connect.stop();
    };
  }, [hubUrl]);

  return connection;
};

export default useSignalR;
