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

const theme = createTheme();

const Home = () => {
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
                <Button variant='outlined' component={Link} to='/post-edit'>
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
                      component='img'
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={post.post_image}
                      alt='post_image'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {post.title}
                      </Typography>
                      <Typography>{post.body}</Typography>
                      <Typography>{post.place}</Typography>
                      <Typography>{post.meetingDatetime}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small'>View</Button>
                      <Button size='small'>Edit</Button>
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
