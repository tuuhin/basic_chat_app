import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Alert, AlertTitle } from "@mui/material";
import { useUserData } from "../../context/joinContext";
import { useSocket } from "../../context/socketContext";
export default function Chat() {
  const socket = useSocket();
  const user = useUserData();
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const messageBox = useRef("");
  useEffect(() => {
    if (socket === null) return;
    socket.on("connect", (args) => {
      socket.emit("join-room", {
        sender: user.name,
        code: user.room_code,
      });
      console.log("New guy has been connected", args);
    });
    socket.on("disconnect", (args) => {
      console.log("logged out !!", args);
    });
    socket.on("message", (args) => {
      // console.log(args);
      setChats([...chats, args]);
    });
    return () => {
      socket.off();
    };
  }, [socket, user, chats]);
  const addMessage = () => {
    const data = {
      sender: user.name,
      code: user.room_code,
      text: text,
    };
    socket.emit("message", data);
    setText("");
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
          pt: 8,
        }}
      >
        {chats.map((e, i) => (
          <Alert
            key={i}
            icon={false}
            severity={
              e.sender === "server"
                ? "info"
                : e.sender === user.name
                ? "success"
                : "warning"
            }
            sx={{
              mt: 1,
              mb: 1,
              mr: e.sender === "server" ? 0 : 1,
              ml: e.sender === "server" ? 0 : 1,
              alignSelf:
                e.sender === "server"
                  ? "center"
                  : e.sender === user.name
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <AlertTitle>{e.sender}</AlertTitle>
            <div>{e.text}</div>
          </Alert>
        ))}
      </Box>
      <Box sx={{ display: "flex", mt: 0 }}>
        <TextField
          inputRef={messageBox}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={addMessage} variant={"contained"}>
          SEND
        </Button>
      </Box>
    </Box>
  );
}
