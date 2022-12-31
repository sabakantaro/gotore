import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getEvents } from "../../lib/api/gotoreAPI";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventBox from "../pages/events/EventBox";

const theme = createTheme();

const Home = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [like, setLike] = useState(false);

  const handleGetEvents = async () => {
    try {
      const res = await getEvents();
      if (res) {
        setEvents(res.data.events);
      } else {
        console.log("No events");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth='sm'>
              <Typography
                component='h1'
                variant='h2'
                align='center'
                color='text.primary'
                gutterBottom
              >
                Welcome to Gotore!
              </Typography>
              <Typography
                variant='h5'
                align='center'
                color='text.secondary'
                paragraph
              >
                You can enjoy to do some workout with your friends anytime &
                anywhere! Let's search your favorite friend. They could help
                with your workout-life, health, and so on!
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction='row'
                spacing={2}
                justifyContent='center'
              >
                <Button
                  color='primary'
                  variant='contained'
                  component={Link}
                  to='/'
                >
                  Search by details
                </Button>
                <Button
                  color='primary'
                  variant='outlined'
                  component={Link}
                  to='/event-create'
                >
                  Gather friends
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth='md'>
            <Grid container spacing={4}>
              {events.map((event) => (
                <EventBox event={event} currentUser={currentUser} />
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default Home;
