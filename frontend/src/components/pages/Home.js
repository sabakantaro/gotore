import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import {
  getEvents,
  searchEvents,
  searchEventsByDatetime,
} from "../../lib/api/gotoreAPI";
import EventBox from "../pages/events/EventBox";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TextField from "@mui/material/TextField";

const theme = createTheme();

const Home = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState(new Date());

  const handleGetEvents = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

  const handleSearchEvents = useCallback(async () => {
    try {
      const res = await searchEvents(keyword);
      if (res) {
        console.log(res.data.events);
        setEvents(res.data.events);
      } else {
        console.log("No events");
      }
    } catch (err) {
      console.log(err);
    }
  }, [keyword]);

  const handleSearchEventsByDatetime = useCallback(async (date) => {
    try {
      const res = await searchEventsByDatetime(
        moment(date).format("YYYY-MM-DDTHH:mm:00Z")
      );
      if (res) {
        console.log(res.data.events);
        setEvents(res.data.events);
      } else {
        console.log("No events");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onChange = useCallback(
    async (date) => {
      setMeetingDatetime(date);
      handleSearchEventsByDatetime(date);
    },
    [handleSearchEventsByDatetime]
  );

  const parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, "YYYY-MM-DDTHH:mm:00Z", "ja").utcOffset(9);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.07),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
      },
    },
  }));

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
              <Stack sx={{ pt: 1 }} spacing={2} justifyContent='center'>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    autoFocus
                    fullWidth
                    placeholder='Search…'
                    inputProps={{ "aria-label": "search" }}
                    defaultValue={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchEvents();
                      }
                    }}
                  />
                </Search>
                <DatePicker
                  selected={moment(meetingDatetime).toDate()}
                  onChange={(date) => onChange(date)}
                  customInput={
                    <TextField
                      margin='normal'
                      fullWidth
                      id='datetime'
                      label='Datetime'
                      name='datetime'
                      autoComplete='datetime'
                      inputProps={{ readOnly: true }}
                    >
                      {parseAsMoment(meetingDatetime).format("YYYY/MM/DD")}
                    </TextField>
                  }
                />
              </Stack>
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
                <EventBox
                  key={event.id}
                  event={event}
                  currentUser={currentUser}
                />
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default Home;
