import { useContext, createContext, useState, useEffect } from "react";
import { useStorage } from "../hooks/storage";

export const useUserData = () => {
  return useContext(Join);
};
export const Join = createContext();

export default function JoinContext(props) {
  const userData = useStorage();
  const [haveJoinedRoom, setHaveJoinedRoom] = useState(false);
  useEffect(() => {
    if (!haveJoinedRoom) {
      userData.removeData();
    }
  }, [haveJoinedRoom, userData]);

  const value = { haveJoinedRoom, setHaveJoinedRoom, ...userData.getData() };
  // console.log(value);
  return <Join.Provider value={value}>{props.children}</Join.Provider>;
}
