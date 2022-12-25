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
import SearchForm from "../posts/SearchForm";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import Edit from "@mui/icons-material/Edit";

const Post = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);
  const params = useParams();

  const handleGetPost = useCallback(async () => {
    try {
      const res = await getPost(params.id);
      if (res) {
        setPost(res.data.post);
        console.log(res.data.post);
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
          <Typography color='text.primary'>{currentUser?.name}</Typography>
        </Breadcrumbs>

        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <CardMedia
              sx={{ borderRadius: "4px 4px 0 0", height: 120 }}
              component='img'
              src={
                currentUser?.image
                  ? currentUser?.image?.url
                  : "https://source.unsplash.com/random"
              }
              alt='post image'
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
                  // alignItems: "center",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt='Remy Sharp'
                      src={
                        currentUser?.image
                          ? currentUser?.image?.url
                          : "https://source.unsplash.com/random"
                      }
                      sx={{ width: 112, height: 112, mt: -8 }}
                    />
                  }
                  action={
                    <IconButton
                      component={RouterLink}
                      to={`/user-edit/${currentUser?.id}`}
                    >
                      <Edit />
                    </IconButton>
                  }
                  sx={{ mt: -3 }}
                />

                {/* <Box
                  sx={{
                    pt: 2,
                  }}
                >
                  <StarIcon sx={{ m: -0.5, color: "pink" }} />
                  <Typography
                    variant='body3'
                    sx={{ ml: 1, fontSize: 20, color: "pink" }}
                  >
                    5.0
                  </Typography>
                </Box> */}

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
                      {currentUser?.name ? currentUser.name : "To be decided"}
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
                      {currentUser?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={8} lg={8}>
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
                    currentUser?.imageUrl
                      ? currentUser.imageUrl
                      : "https://source.unsplash.com/random"
                  }
                  alt='post image'
                />
              </Paper>
            </Grid> */}
          {/* </Grid> */}
        </Container>
      </Box>
    </>
  );
};

export default Post;
