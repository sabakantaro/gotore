import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { getChatRooms } from "../../../lib/api/gotoreAPI";

const ChatRooms = () => {
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState([]);

  const handleGetChatRooms = async () => {
    try {
      const res = await getChatRooms();

      if (res.status === 200) {
        setChatRooms(res.data.chatRooms);
      } else {
        console.log("No chat rooms");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetChatRooms();
  }, []);

  return (
    <>
      {!loading ? (
        chatRooms.length > 0 ? (
          chatRooms.map((chatRoom, index) => {
            return (
              <Grid container key={index} sx={{ justifyContent: "center" }}>
                <List>
                  <Link
                    to={`/chatroom/${chatRoom.chatRoom.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        minWidth: 340,
                        maxWidth: "100%",
                      }}
                    >
                      <ListItem alignItems='flex-start' style={{ padding: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            alt='avatar'
                            src={chatRoom.otherUser?.image.url}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chatRoom.otherUser?.name}
                          secondary={
                            <div style={{ marginTop: "0.5rem" }}>
                              <Typography
                                component='span'
                                variant='body2'
                                color='textSecondary'
                              >
                                {chatRoom.lastMessage === null
                                  ? "No messages"
                                  : chatRoom.lastMessage.content.length > 30
                                  ? chatRoom.lastMessage.content.substr(0, 30) +
                                    "..."
                                  : chatRoom.lastMessage.content}
                              </Typography>
                            </div>
                          }
                        />
                      </ListItem>
                    </div>
                  </Link>
                  <Divider component='li' />
                </List>
              </Grid>
            );
          })
        ) : (
          <Typography component='p' variant='body2' color='textSecondary'>
            No user
          </Typography>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatRooms;
