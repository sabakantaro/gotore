import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import Cancel from "@mui/icons-material/Cancel";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { editUser } from "../../../lib/api/gotoreAPI";
import "react-datepicker/dist/react-datepicker.css";

const theme = createTheme();

export default function CreatePost({ currentUser }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const params = useParams();

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
    formData.append("user[image]", image);
    formData.append("user[name]", name);
    formData.append("user[email]", currentUser.email);
    formData.append("user[password]", currentUser.password);

    console.log(formData);
    return formData;
  }, [image, name, currentUser]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = createFormData();

      await editUser(params.id, data).then(() => {
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
            Edit User Info
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              send
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
