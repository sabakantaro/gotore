import React, { useState, useCallback } from "react";
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
import Cancel from "@mui/icons-material/Cancel";
import { editPost } from "../../../lib/api/gotoreAPI";

const theme = createTheme();

export default function EditPost({ currentUser }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [place, setPlace] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  // const [categoriesList, setcategoriesList] = useState([]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

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
    image && formData.append("file", image);

    return formData;
  }, [image]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const imageData = createFormData();
      const data = {
        title: title,
        body: body,
        place: place,
        meeting_datetime: meetingDatetime,
        category_id: categoryId,
        post_image: imageData,
        user_id: currentUser?.id || null,
      };

      await editPost(data).then(() => {
        setTitle("");
        setBody("");
        setPlace("");
        setMeetingDatetime("");
        setCategoryId("");
        setPreview("");
        setImage("");
        console.log("success");
      });
    },
    [
      body,
      categoryId,
      createFormData,
      meetingDatetime,
      place,
      title,
      currentUser,
    ]
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
        <Button variant='contained' component='span'>
          {props.children}
        </Button>
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
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <UploadButton
              className='primary'
              name='image'
              onChange={(e) => {
                uploadImage(e);
                previewImage(e);
              }}
            >
              Upload
            </UploadButton>
            {preview && (
              <Box sx={{ borderRadius: 1, borderColor: "grey.400" }}>
                <IconButton color='inherit' onClick={() => setPreview("")}>
                  <Cancel />
                </IconButton>
                <img src={preview} alt='preview img' />
              </Box>
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
            <TextField
              value={meetingDatetime}
              onChange={(e) => setMeetingDatetime(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='datetime'
              label='Datetime'
              name='datetime'
              autoComplete='datetime'
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
