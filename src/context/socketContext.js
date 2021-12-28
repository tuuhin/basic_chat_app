import { useContext, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import React from "react";

const SocketContext = createContext();

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export default function SocketProvider({ children }) {
  const [socket, setsocket] = useState(null);
  useEffect(() => {
    const sio = io("http://127.0.0.1:5000/");
    setsocket(sio);
    return () => {
      sio.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
