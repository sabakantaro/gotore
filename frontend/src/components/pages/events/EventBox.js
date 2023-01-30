import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventsFavoritesButton from "../events/EventsFavoritesButton";

const EventBox = ({ event, currentUser = [] }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        variant='body'
        style={{ color: "black", textDecoration: "none" }}
        component={Link}
        to={`/events/${event.id}`}
      >
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            height='200'
            component='img'
            src={
              event.imageUrl
                ? event.imageUrl
                : "https://source.unsplash.com/random"
            }
            alt='Event image'
          />
          {currentUser && (
            <EventsFavoritesButton event={event} currentUser={currentUser} />
          )}
          <CardHeader
            avatar={
              <Avatar
                alt='User Image'
                src={
                  event.user?.image
                    ? event.user?.imageUrl
                    : "https://source.unsplash.com/random"
                }
              />
            }
            action={
              event.userId === currentUser?.id && (
                <IconButton component={Link} to={`/event-edit/${event.id}`}>
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={`${event.user?.name}`}
          />
          <CardContent sx={{ flexGrow: 1, pt: 0, pb: 0 }}>
            <Typography
              gutterBottom
              variant='h5'
              sx={{
                mb: 2,
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                textOverflow: "ellipsis",
              }}
            >
              {event.title ? event.title : "New event"}
            </Typography>
            <Grid container>
              <Grid item xs={2}>
                <LocationOnIcon />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant='body3'
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.address ? event.address : "To be decided"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <EventIcon />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body3'>
                  {event.meetingDatetime
                    ? moment(event.meetingDatetime).format("YYYY-MM-DD")
                    : "To be decided"}
                </Typography>
              </Grid>
            </Grid>
            <Typography
              sx={{
                mt: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                textOverflow: "ellipsis",
              }}
              variant='body1'
            >
              {event.body}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default EventBox;
