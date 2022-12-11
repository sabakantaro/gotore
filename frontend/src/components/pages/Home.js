import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getPosts } from "../../lib/api/gotoreAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";

const theme = createTheme();

const Home = (currentUser) => {
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      console.log(res);

      if (res) {
        setPosts(res.data.posts);
      } else {
        console.log("No articles");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetPosts();
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
                <Button variant='contained' component={Link} to='/post'>
                  Search by details
                </Button>
                <Button variant='outlined' component={Link} to='/post-create'>
                  Gather friends
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth='md'>
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
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
                        post.imageUrl
                          ? post.imageUrl
                          : "https://source.unsplash.com/random"
                      }
                      alt='post image'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
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
                        {post.title ? post.title : "New Post"}
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
                            {post.place ? post.place : "To be decided"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <EventIcon />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant='body3'>
                            {post.meetingDatetime
                              ? moment(post.meetingDatetime).format(
                                  "YYYY-MM-DD"
                                )
                              : "To be decided"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          mt: 2,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "100%",
                          textOverflow: "ellipsis",
                        }}
                        variant='body1'
                      >
                        {post.body ? post.body : "Hello!"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        component={Link}
                        to={`/posts/${post.id}`}
                      >
                        View
                      </Button>
                      {/* eslint-disable-next-line eqeqeq */}
                      {post.userId == currentUser.id && (
                        <Button
                          size='small'
                          component={Link}
                          to={`/post-edit/${post.id}`}
                        >
                          Edit
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default Home;
