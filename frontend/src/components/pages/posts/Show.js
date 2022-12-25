import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getPost } from "../../../lib/api/gotoreAPI";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);
  const params = useParams();

  const handleGetPost = useCallback(async () => {
    try {
      const res = await getPost(params.id);
      if (res) {
        setPost(res.data.post);
      } else {
        console.log("No post");
      }
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    handleGetPost();
  }, [handleGetPost]);

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
          <Typography color='text.primary'>{post.title}</Typography>
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
                    post.imageUrl
                      ? post.imageUrl
                      : "https://source.unsplash.com/random"
                  }
                  alt='post image'
                />
                <div style={{ padding: 24 }}>
                  <CardHeader
                    sx={{ p: 0 }}
                    action={
                      currentUser &&
                      post.userId === currentUser?.id && (
                        <IconButton
                          component={RouterLink}
                          to={`/post-edit/${post.id}`}
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
                        {post.title ? post.title : "New Post"}
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
                        {post.place ? post.place : "Anytimefitness Vancouver"}
                      </Typography>
                    }
                    color='text.secondary'
                  />
                  <CardHeader
                    sx={{ pt: 0 }}
                    avatar={
                      <Avatar src={post?.user?.image && post.user.image.url}>
                        {currentUser?.name.charAt(0)}
                      </Avatar>
                    }
                    title={`${post.user?.name}`}
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
                        {post.meetingDatetime
                          ? moment(post.meetingDatetime).format("YYYY-MM-DD")
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
                        {post.category?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ justifyContent: "center" }}>
                    <IconButton
                      onClick={() => (like ? setLike(false) : setLike(true))}
                    >
                      {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      <Typography variant='body1'>{post.id}</Typography>
                    </IconButton>
                  </CardActions>
                  <Divider />
                  <Typography
                    sx={{
                      mt: 1,
                      whiteSpace: "pre-wrap",
                    }}
                    variant='body1'
                  >
                    {post.body ? post.body : "Hello!"}
                  </Typography>
                </div>
                <div style={{ padding: 12, width: "100%" }}>
                  <iframe
                    title='Google Map'
                    src={`https://www.google.com/maps?output=embed&q=${post.place}`}
                    style={{
                      border: 0,
                      borderRadius: 3,
                      width: "100%",
                      height: 300,
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Post;
