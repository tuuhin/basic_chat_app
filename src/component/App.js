import Home from "./home/home";
import Room from "./room/room";
import { useUserData } from "../context/joinContext";
import SocketProvider from "../context/socketContext";
const App = () => {
  const user = useUserData();
  return !user.haveJoinedRoom ? (
    <Home />
  ) : (
    <SocketProvider>
      <Room />
    </SocketProvider>
  );
};

export default App;
