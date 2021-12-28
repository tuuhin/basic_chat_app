import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { useUserData } from "../../context/joinContext";
import { Box } from "@mui/system";
import { Logout } from "@mui/icons-material";
import Chat from "./chat";
import { useSocket } from "../../context/socketContext";

export default function Room() {
  const socket = useSocket();
  const user = useUserData();
  const logOutButton = () => {
    fetch("room/delete-joinee", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: user.name, room_code: user.room_code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success" && socket !== null) {
          socket.emit("leave_room", {
            sender: user.name,
            code: user.room_code,
          });
          user.setHaveJoinedRoom(false);
        }
      });
  };
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} component="div">
            <Typography>{user.name ?? "absent"}</Typography>
            <Typography variant="subtitle2">
              Room Code : {user.room_code ?? "absent"}
            </Typography>
          </Box>
          <IconButton onClick={logOutButton}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Chat />
    </Box>
  );
}
