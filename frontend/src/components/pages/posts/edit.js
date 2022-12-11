import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import Cancel from "@mui/icons-material/Cancel";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { editPost, getPost } from "../../../lib/api/gotoreAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const theme = createTheme();

export default function EditPost({ currentUser }) {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [place, setPlace] = useState(post.place);
  const [meetingDatetime, setMeetingDatetime] = useState(post.meetingDatetime);
  const [categoryId, setCategoryId] = useState(post.categoryId);
  // const [categoriesList, setcategoriesList] = useState([]);
  const [image, setImage] = useState(post.imageUrl);
  const [preview, setPreview] = useState(post.imageUrl);
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

  const parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, "YYYY-MM-DDTHH:mm:00Z", "ja").utcOffset(9);
  };

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = useCallback(() => {
    const formData = new FormData();
    if (!image) return;
    formData.append("post[post_image]", image);
    formData.append("post[title]", title);
    formData.append("post[body]", body);
    formData.append("post[place]", place);
    formData.append("post[meeting_datetime]", meetingDatetime);
    formData.append("post[category_id]", categoryId);
    formData.append("post[user_id]", currentUser?.id || null);

    console.log(formData);
    return formData;
  }, [body, categoryId, currentUser, image, meetingDatetime, place, title]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = createFormData();

      await editPost(params.id, data).then(() => {
        navigate("/");
      });
    },
    [createFormData, navigate, params.id]
  );

  const UploadButton = useCallback((props) => {
    return (
      <label htmlFor={`upload-button-${props.name}`}>
        <input
          style={{ display: "none" }}
          id={`upload-button-${props.name}`}
          name={props.name}
          multiple
          type='file'
          onChange={props.onChange}
        />
        <IconButton aria-label='upload picture' component='center'>
          <CameraAlt />
        </IconButton>
      </label>
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Gather workout friends!
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }} align='center'>
            {preview ? (
              <Box sx={{ borderRadius: 1, borderColor: "grey.400" }}>
                <IconButton color='inherit' onClick={() => setPreview("")}>
                  <Cancel />
                </IconButton>
                <CardMedia
                  height='200'
                  component='img'
                  src={preview}
                  alt='preview img'
                />
              </Box>
            ) : (
              <UploadButton
                className='primary'
                name='image'
                onChange={(e) => {
                  uploadImage(e);
                  previewImage(e);
                }}
              />
            )}
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='title'
              label='Title'
              name='title'
              autoComplete='title'
              autoFocus
            />
            <TextField
              value={body}
              onChange={(e) => setBody(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='body'
              label='Body'
              name='body'
              autoComplete='body'
              autoFocus
            />
            <FormControl fullWidth required margin='normal'>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                label='Catogory'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <MenuItem value={1}>Hobby</MenuItem>
                <MenuItem value={2}>Professional</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='place'
              label='Place'
              name='place'
              autoComplete='place'
              autoFocus
            />
            <DatePicker
              selected={moment(meetingDatetime).toDate()}
              onChange={(date) => setMeetingDatetime(date)}
              customInput={
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='datetime'
                  label='Datetime'
                  name='datetime'
                  autoComplete='datetime'
                  autoFocus
                  inputProps={{ readOnly: true }}
                >
                  {parseAsMoment(meetingDatetime).format("YYYY/MM/DD")}
                </TextField>
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Let's start Gathering!
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
