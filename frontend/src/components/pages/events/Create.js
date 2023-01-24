import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  createEvent,
  getCategories,
  getcities,
} from "../../../lib/api/gotoreAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const theme = createTheme();

export default function CreateEvent({ currentUser }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState(new Date());
  const [categoryId, setCategoryId] = useState(1);
  const [cityId, setCityId] = useState(0);
  const [categoriesList, setcategoriesList] = useState([]);
  const [citiesList, setcitiesList] = useState([]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleGetCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      if (res.data) {
        console.log(res);
        setcategoriesList(res.data.categories);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleGetcities = useCallback(async () => {
    try {
      const res = await getcities();
      if (res.data) {
        setcitiesList(res.data.cities);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleGetCategories();
    handleGetcities();
  }, [handleGetCategories, handleGetcities]);

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
    formData.append("event[image]", image);
    formData.append("event[title]", title);
    formData.append("event[body]", body);
    formData.append("event[address]", address);
    formData.append("event[meeting_datetime]", meetingDatetime);
    formData.append("event[category_id]", categoryId);
    formData.append("event[user_id]", currentUser?.id || null);

    console.log(formData);
    return formData;
  }, [body, categoryId, currentUser, image, meetingDatetime, address, title]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = createFormData();

      await createEvent(data).then(() => {
        navigate("/");
      });
    },
    [createFormData, navigate]
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
                {categoriesList &&
                  categoriesList.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required margin='normal'>
              <InputLabel id='demo-simple-select-label'>citie</InputLabel>
              <Select
                label='citie'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
              >
                {citiesList &&
                  citiesList.map((citie) => (
                    <MenuItem key={citie.id} value={citie.id}>
                      {citie.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='address'
              label='Address'
              name='address'
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
