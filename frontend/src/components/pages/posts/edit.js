import React, { useState } from "react";
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
import { editPost } from "../../../lib/api/gotoreAPI";

const theme = createTheme();

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [place, setPlace] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [categoriesList, setcategoriesList] = useState([]);
  const [postFileData, setPostFileData] = useState({});

  const handleSubmit = async () => {
    const data = {
      title: title,
      body: body,
      place: place,
      meeting_datetime: meetingDatetime,
      category_id: categoryId,
    };
    try {
      const res = await editPost(data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const formData = new FormData();
  // postData.append("image", postFileData.image ? postFileData.image : "");
  // const response = axios.post("/image/store", params, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });

  const changeUploadFile = async (event) => {
    const { name, files } = event.target;
    setPostFileData({
      ...postFileData,
      [name]: files[0],
    });
    console.log(postFileData);
    event.target.value = "";
  };

  const UploadButton = (props) => {
    return (
      <label htmlFor={`upload-button-${props.name}`}>
        <input
          // accept='image/*'
          style={{ display: "none" }}
          id={`upload-button-${props.name}`}
          name={props.name}
          multiple
          type='file'
          onChange={props.onChange}
        />
        <Button variant='contained' component='span' {...props}>
          {props.children}
        </Button>
      </label>
    );
  };

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
              onChange={changeUploadFile}
            >
              Upload your picture
            </UploadButton>
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
