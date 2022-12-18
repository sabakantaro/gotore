import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getPosts, deletePost } from "../../lib/api/gotoreAPI";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FavoriteBorderIcon from "@mui/icons-material/Fa voriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// // import ShareIcon from "@mui/icons-material/Share";
// import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme();

const Home = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

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

  const handleDeletePost = useCallback(
    async (id) => {
      await deletePost(id).then(() => {
        navigate("/");
      });
    },
    [navigate]
  );

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
                <Button
                  color='secondary'
                  variant='contained'
                  component={Link}
                  to='/post'
                >
                  Search by details
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  component={Link}
                  to='/post-create'
                >
                  Gather friends
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth='md'>
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Link
                    variant='body'
                    style={{ color: "black", textDecoration: "none" }}
                    component={Link}
                    to={`/posts/${post.id}`}
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
                          post.imageUrl
                            ? post.imageUrl
                            : "https://source.unsplash.com/random"
                        }
                        alt='post image'
                      />
                      <CardHeader
                        avatar={<Avatar>U</Avatar>}
                        action={
                          post.userId === currentUser.id && (
                            <IconButton
                              component={Link}
                              to={`/post-edit/${post.id}`}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          )
                        }
                        title={`${post.user?.name}`}
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
                            mt: 1,
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
                      {/* <CardActions disableSpacing>
                        <IconButton
                          onClick={() =>
                            like ? setLike(false) : setLike(true)
                          }
                        >
                          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        {post.userId === currentUser.id && (
                          <div
                            className={{
                              marginLeft: "auto",
                            }}
                          >
                            <IconButton
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </CardActions> */}
                    </Card>
                  </Link>
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
