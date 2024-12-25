import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  const initializeSocket = () => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  };

  useEffect(() => {
    initializeSocket();
  }, []);

  // useEffect(() => {
  // currentUser && socket?.emit("newUser", currentUser.id);
  // }, [currentUser, socket]);

  useEffect(() => {
    const emitNewUser = () => {
      if (currentUser && socket) {
        socket.emit("newUser", currentUser.id);
      }
    };

    emitNewUser();
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
