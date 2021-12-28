import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Grid,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

import { useUserData } from "../../context/joinContext";
import { useStorage } from "../../hooks/storage";

export default function BaseCard() {
  const username = useRef("");
  const code = useRef("");
  const user = useUserData();
  const storage = useStorage();
  const [usernameValid, setUsernameValid] = useState(false);
  const [codeValid, setcodeValid] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertBody, setAlertBody] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const joinButton = () => {
    if (username.current.value === "") return setUsernameValid(true);
    if (code.current.value === "") return setcodeValid(true);
    fetch("room/join-room", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        code: code.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsMessage(true);
        setAlertBody(data.response);
        setAlertType(data.status);
        if (data.status === "success") {
          storage.setUserData({
            name: username.current.value,
            room_code: code.current.value,
          });
          user.setHaveJoinedRoom(true);
        }
      })
      .catch(() => {
        setIsMessage(true);
        setAlertBody("failed to connect to the server");
        setAlertType("error");
      });

    // setIsMessage(true);
  };

  const createRoomButton = () => {
    fetch("room/create-room", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsMessage(true);
        setAlertBody(data.response);
        setAlertType(data.status);
      });
    // user.setHaveJoinedRoom(true);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardHeader title="Create Room" />
        <CardContent>
          <Collapse in={isMessage} sx={{ mb: 1 }}>
            <Alert severity={alertType}>{alertBody}</Alert>
          </Collapse>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                error={usernameValid}
                inputRef={username}
                label="Enter your Username"
                onChange={(e) => {
                  if (e.target.value.length > 0) return setUsernameValid(false);
                }}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                error={codeValid}
                inputRef={code}
                label="Enter your code"
                fullWidth
                onChange={(e) => {
                  if (e.target.value.length > 0) return setcodeValid(false);
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={joinButton}>
            Join
          </Button>
          <Button variant="contained" fullWidth onClick={createRoomButton}>
            Create
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
