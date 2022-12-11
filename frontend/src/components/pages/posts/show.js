import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getPost, deletePost } from "../../../lib/api/gotoreAPI";

const Post = ({ currentUser }) => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

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

  const handleDeletePost = useCallback(
    async (id) => {
      await deletePost(id).then(() => {
        navigate("/");
      });
    },
    [navigate]
  );

  return (
    <>
      <Card
        className={{
          width: 320,
          marginTop: "2rem",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow:
              "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            transform: "translateY(-3px)",
          },
        }}
      >
        <CardHeader
          avatar={<Avatar>U</Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${currentUser.name}`}
        />
        <CardMedia
          component='img'
          src={
            post.imageUrl ? post.imageUrl : "https://source.unsplash.com/random"
          }
          alt='post image'
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='span'>
            {post.body ? post.body : "No content"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => (like ? setLike(false) : setLike(true))}>
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <div
            className={{
              marginLeft: "auto",
            }}
          >
            <IconButton onClick={() => handleDeletePost(post.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
