import React, { useEffect, useState, useCallback } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import { getChatRoom, createMessage } from "../../../lib/api/gotoreAPI";

const ChatRoom = ({ currentUser }) => {
  const params = useParams();

  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState("");
  const [messages, setMeesages] = useState([]);
  const [content, setContent] = useState("");

  const handleGetChatRoom = useCallback(async () => {
    try {
      const res = await getChatRoom(id);
      console.log(res);

      if (res) {
        setOtherUser(res?.data.otherUser);
        setMeesages(res?.data.messages);
      } else {
        console.log("No other user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    handleGetChatRoom();
  }, [handleGetChatRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      chat_room_id: id,
      user_id: currentUser?.id,
      content: content,
    };

    try {
      const res = await createMessage(data);
      console.log(res);

      if (res) {
        setMeesages([...messages, res.data.message]);
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const iso8601ToDateTime = (iso8601) => {
    const date = new Date(Date.parse(iso8601));
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
          <Breadcrumbs aria-label='breadcrumb' sx={{ m: 2, ml: 18 }}>
            <Link
              underline='hover'
              color='inherit'
              component={RouterLink}
              to='/'
            >
              TOP
            </Link>
            <Typography color='text.primary'>{currentUser?.name}</Typography>
          </Breadcrumbs>

          <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ maxWidth: 360 }}>
                  <Grid
                    container
                    justify='center'
                    style={{ marginBottom: "1rem" }}
                  >
                    <Grid item>
                      <Avatar
                        alt='avatar'
                        src={otherUser?.image.url || ""}
                        style={{
                          width: "spacing(10)",
                          height: "spacing(10)",
                          margin: "0 auto",
                        }}
                      />
                      <Typography
                        variant='body2'
                        component='p'
                        gutterBottom
                        style={{
                          marginTop: "0.5rem",
                          marginBottom: "1rem",
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
                        justify={
                          message.userId === otherUser?.id
                            ? "flex-start"
                            : "flex-end"
                        }
                      >
                        <Grid item>
                          <Box
                            borderRadius={
                              message.userId === otherUser?.id
                                ? "30px 30px 30px 0px"
                                : "30px 30px 0px 30px"
                            }
                            bgcolor={
                              message.userId === otherUser?.id
                                ? "#d3d3d3"
                                : "#ffb6c1"
                            }
                            color={
                              message.userId === otherUser?.id
                                ? "#000000"
                                : "#ffffff"
                            }
                            m={1}
                            border={0}
                            style={{ padding: "1rem" }}
                          >
                            <Typography variant='body1' component='p'>
                              {message.content}
                            </Typography>
                          </Box>
                          <Typography
                            variant='body2'
                            component='p'
                            color='textSecondary'
                            style={{
                              textAlign:
                                message.userId === otherUser?.id
                                  ? "left"
                                  : "right",
                            }}
                          >
                            {iso8601ToDateTime(
                              message.createdAt?.toString() || "100000000"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                  <Grid
                    container
                    justify='center'
                    style={{ marginTop: "2rem" }}
                  >
                    <form
                      style={{
                        padding: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 340,
                      }}
                      noValidate
                      autoComplete='off'
                    >
                      <TextField
                        required
                        multiline
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                          width: "100%",
                        }}
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        disabled={!content ? true : false}
                        onClick={handleSubmit}
                        style={{ marginLeft: "spacing(1)" }}
                      >
                        <SendIcon />
                      </Button>
                    </form>
                  </Grid>
                </div>
              </Paper>
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
