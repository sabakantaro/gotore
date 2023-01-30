import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { getFollowings } from "../../../lib/api/gotoreAPI";

const Followers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const params = useParams();

  const handlegetFollowings = useCallback(async () => {
    try {
      const res = await getFollowings(params.userId);
      if (res) {
        setUsers(res.data.users);
      } else {
        console.log("No chat rooms");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [params]);

  useEffect(() => {
    handlegetFollowings();
  }, [handlegetFollowings]);

  return (
    <>
      {!loading ? (
        users.length > 0 ? (
          users.map((user, index) => {
            return (
              <Grid container key={index} sx={{ justifyContent: "center" }}>
                <List>
                  <Link
                    to={`/users/${user.id}`}
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
                          <Avatar alt='avatar' src={user.image.url} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={user.profile ? user.profile : "Hello"}
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
          <Grid container sx={{ justifyContent: "center" }}>
            <Typography component='p' variant='body2' color='textSecondary'>
              No user
            </Typography>
          </Grid>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Followers;
