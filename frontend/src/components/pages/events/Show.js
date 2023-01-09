import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  getEvent,
  createParticipate,
  deleteComment,
  createComment,
} from "../../../lib/api/gotoreAPI";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchForm from "./SearchForm";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventsFavoritesButton from "../events/EventsFavoritesButton";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";

const Event = ({ currentUser }) => {
  const [event, setEvent] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleGetEvent = useCallback(async () => {
    try {
      const res = await getEvent(params.id);
      if (res) {
        setEvent(res.data.event);
        setComments(res.data.comments);
      } else {
        console.log("No event");
      }
    } catch (err) {
      console.log(err);
    }
  }, [params]);

  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);

  const handleCreateParticipate = useCallback(async () => {
    const data = {
      user_id: currentUser?.id,
      event_id: event.id,
    };

    try {
      const res = await createParticipate(data);
      console.log(res);

      if (res) {
        navigate(`/`);
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, navigate, event]);

  const handleCreateComment = useCallback(async () => {
    const data = {
      user_id: currentUser?.id,
      event_id: event.id,
      content: content,
    };
    try {
      const res = await createComment(event.id, data);
      if (res) {
        setContent("");
        handleGetEvent();
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentUser, event, content, handleGetEvent]);

  const handleDeleteComment = useCallback(
    async (commentId) => {
      try {
        const res = await deleteComment(event.id, commentId);
        if (res) {
          handleGetEvent();
        } else {
          console.log("Failed");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [event, handleGetEvent]
  );

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
          <Typography color='text.primary'>{event.title}</Typography>
        </Breadcrumbs>
        <Container maxWidth='lg' sx={{ mt: 0, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SearchForm />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  sx={{ borderRadius: "4px 4px 0 0", height: 400 }}
                  component='img'
                  src={
                    event.imageUrl
                      ? event.imageUrl
                      : "https://source.unsplash.com/random"
                  }
                  alt='event image'
                />
                <EventsFavoritesButton
                  event={event}
                  currentUser={currentUser}
                />
                <div style={{ padding: 24 }}>
                  <CardHeader
                    sx={{ p: 0 }}
                    action={
                      currentUser &&
                      event.userId === currentUser?.id && (
                        <IconButton
                          component={RouterLink}
                          to={`/event-edit/${event.id}`}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )
                    }
                    title={
                      <Typography
                        gutterBottom
                        variant='h5'
                        sx={{
                          mb: 0,
                        }}
                      >
                        {event.title ? event.title : "New event"}
                      </Typography>
                    }
                  />
                  <CardHeader
                    sx={{ pt: 0, pl: 0 }}
                    avatar={
                      <LocationOnIcon color='disabled' sx={{ fontSize: 16 }} />
                    }
                    title={
                      <Typography
                        gutterBottom
                        variant='h5'
                        sx={{
                          mb: 0,
                          fontSize: 16,
                          color: "text.secondary",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "100%",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.place ? event.place : "Anytimefitness Vancouver"}
                      </Typography>
                    }
                    color='text.secondary'
                  />
                  <CardHeader
                    sx={{ pt: 0 }}
                    avatar={
                      <Avatar src={event?.user?.image && event.user.image.url}>
                        {currentUser?.name.charAt(0)}
                      </Avatar>
                    }
                    title={`${event.user?.name}`}
                  />
                  <Grid container sx={{ mt: 0.5 }}>
                    <Grid item xs={6} sx={{ backgroundColor: "lightgray" }}>
                      <Typography
                        variant='body3'
                        sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                      >
                        Event date
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant='body3'
                        sx={{ fontSize: 14, fontWeight: "bold", ml: 1 }}
                      >
                        {event.meetingDatetime
                          ? moment(event.meetingDatetime).format("YYYY-MM-DD")
                          : "To be decided"}
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
                        {event.category?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={handleCreateParticipate}
                      disabled={event.userId === currentUser?.id}
                    >
                      Participate it!
                    </Button>
                  </CardActions>
                  <Divider />
                  <Typography
                    sx={{
                      mt: 1,
                      whiteSpace: "pre-wrap",
                    }}
                    variant='body1'
                  >
                    {event.body ? event.body : "Hello!"}
                  </Typography>
                </div>
                <div style={{ padding: 12, width: "100%" }}>
                  <iframe
                    title='Google Map'
                    src={`https://www.google.com/maps?output=embed&q=${event.place}`}
                    style={{
                      border: 0,
                      borderRadius: 3,
                      width: "100%",
                      height: 300,
                    }}
                  />
                </div>
                <Divider />
                <Typography
                  sx={{
                    mt: 3,
                    pl: 2,
                  }}
                  variant='body1'
                >
                  Comments
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    pr: 1.5,
                  }}
                >
                  {comments?.map((comment) => (
                    <>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar
                            alt='User Name'
                            src={comment?.user.imageUrl}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={comment.content} />
                        {currentUser?.id === comment.userId && (
                          <Stack
                            direction='row'
                            alignItems='center'
                            spacing={1}
                          >
                            <IconButton aria-label='delete' size='small'>
                              <DeleteIcon
                                fontSize='small'
                                onClick={() => handleDeleteComment(comment.id)}
                              />
                            </IconButton>
                          </Stack>
                        )}
                      </ListItem>

                      <Divider variant='inset' component='li' />
                    </>
                  ))}
                </List>
                <TextField
                  id='outlined-multiline-static'
                  multiline
                  rows={4}
                  sx={{ p: 1.5, pt: 1 }}
                  value={content}
                  placeholder="Hello, I'm Muscle! Where is this event held? I'd like to know detail place."
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                />
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={handleCreateComment}
                    fullWidth
                  >
                    send
                  </Button>
                </CardActions>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Event;
