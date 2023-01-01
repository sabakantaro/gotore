import React, { useEffect, useState, useCallback } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import EventBox from "../events/EventBox";
import { getUser } from "../../../lib/api/gotoreAPI";

const User = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState([]);
  const params = useParams();

  const handleGetUser = useCallback(async () => {
    try {
      const res = await getUser(params.id);
      console.log(res.data.favoriteEvents);
      setUser(res.data.user);
      setEvents(res.data.favoriteEvents);
    } catch (err) {
      console.log(err);
    }
  }, [params]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <>
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
          <Link underline='hover' color='inherit' component={RouterLink} to='/'>
            TOP
          </Link>
          <Typography color='text.primary'>{user?.name}</Typography>
        </Breadcrumbs>

        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <CardMedia
              sx={{ borderRadius: "4px 4px 0 0", height: 120 }}
              component='img'
              src={
                user?.image
                  ? user?.image?.url
                  : "https://source.unsplash.com/random"
              }
              alt='Event image'
            />
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt='Remy Sharp'
                      src={
                        user?.image
                          ? user.image.url
                          : "https://source.unsplash.com/random"
                      }
                      sx={{ width: 112, height: 112, mt: -8 }}
                    />
                  }
                  action={
                    currentUser?.id === user?.id && (
                      <IconButton
                        component={RouterLink}
                        to={`/user-edit/${user?.id}`}
                      >
                        <Edit />
                      </IconButton>
                    )
                  }
                  sx={{ mt: -3 }}
                />
                <Grid container sx={{ mt: 0.5 }}>
                  <Grid item xs={6} sx={{ backgroundColor: "lightgray" }}>
                    <Typography
                      variant='body3'
                      sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                    >
                      Event joined
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant='body3'
                      sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                    >
                      {user?.name ? user.name : "To be decided"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: 0.5, mb: 1 }}>
                  <Grid item xs={6} sx={{ backgroundColor: "lightgray" }}>
                    <Typography
                      variant='body3'
                      sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                    >
                      Category
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant='body3'
                      sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                    >
                      {user?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Container>
        {events && (
          <Container maxWidth='md'>
            <Typography
              variant='body3'
              sx={{ fontSize: 20, fontWeight: "bold" }}
            >
              Favorite events
            </Typography>
            <Grid container sx={{ mb: 5 }} spacing={4}>
              {events.map((event) => (
                <EventBox
                  key={event.id}
                  event={event}
                  currentUser={currentUser}
                />
              ))}
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default User;
