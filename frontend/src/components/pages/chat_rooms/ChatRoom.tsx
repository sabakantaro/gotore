import React, { useEffect, useState, useCallback,  useContext } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getChatRoom, createMessage } from "../../../lib/api/gotoreAPI";
import { User, Message } from "interfaces/index"
import { AuthContext } from "App"

const ChatRoom: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const {id} = useParams<string>();
  const [loading, setLoading] = useState<boolean>(true)
  const [otherUser, setOtherUser] = useState<User>()
  const [messages, setMeesages] = useState<Message[]>([])
  const [content, setContent] = useState<string>("")

  const handleGetChatRoom = useCallback(async () => {
    try {
      const res = await getChatRoom(Number(id));
      console.log(res?.data.otherUser);
      if (res) {
        setOtherUser(res?.data.otherUser);
        setMeesages(res?.data.messages);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    handleGetChatRoom();
  }, [handleGetChatRoom]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      // chat_room_id: Number(id),
      // user_id: currentUser?.id,
      chatRoomId: Number(id),
      userId: currentUser?.id,
      content: content,
    };
    try {
      const res = await createMessage(data);
      if (res) {
        setMeesages([...messages, res.data.message]);
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const iso8601ToDateTime = (iso8601: string | undefined) => {
    const date = new Date(Date.parse(iso8601!));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return (
      year + "年" + month + "月" + day + "日" + hour + "時" + minute + "分"
    );
  };

  return (
    <>
      {!loading ? (
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container
            component='main'
            maxWidth='sm'
            sx={{ mb: 4, justifyContent: "center" }}
          >
            <Grid container sx={{ mb: 1, justifyContent: "center" }}>
              <Grid item>
                <Avatar
                  alt='avatar'
                  src={otherUser?.image.url || ""}
                  sx={{
                    width: 60,
                    height: 60,
                    margin: "0 auto",
                  }}
                />
                <Typography
                  variant='body2'
                  component='p'
                  gutterBottom
                  sx={{
                    mt: 0.5,
                    mb: 1,
                    textAlign: "center",
                  }}
                >
                  {otherUser?.name}
                </Typography>
              </Grid>
            </Grid>
            {messages.map((message, index) => {
              return (
                <Grid
                  key={index}
                  container
                  sx={{
                    justifyContent:
                      message.userId === otherUser?.id
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  <Grid item>
                    <Box
                      borderRadius={
                        message.userId === otherUser?.id
                          ? "30px 30px 30px 0px"
                          : "30px 30px 0px 30px"
                      }
                      bgcolor={
                        message.userId === otherUser?.id ? "#d3d3d3" : "#666666"
                      }
                      color={
                        message.userId === otherUser?.id ? "#333333" : "#ffffff"
                      }
                      sx={{ p: 1, m: 1 }}
                    >
                      <Typography variant='body1' component='p'>
                        {message.content}
                      </Typography>
                    </Box>
                    <Typography
                      variant='body2'
                      component='p'
                      color='textSecondary'
                      sx={{
                        textAlign:
                          message.userId === otherUser?.id ? "left" : "right",
                      }}
                    >
                      {iso8601ToDateTime(message.createdAt?.toString())}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
            <Grid container sx={{ mt: 2, justifyContent: "center" }}>
              <form
                style={{
                  padding: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                noValidate
                autoComplete='off'
              >
                <TextField
                  required
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                  variant='standard'
                />
                <Button
                  variant='contained'
                  color='primary'
                  disabled={!content ? true : false}
                  onClick={handleSubmit}
                  sx={{ ml: 1 }}
                >
                  <SendIcon />
                </Button>
              </form>
            </Grid>
          </Container>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatRoom;
