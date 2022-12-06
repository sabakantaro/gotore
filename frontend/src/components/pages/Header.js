import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../../lib/api/gotoreAPI";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const Header = () => {
  const navigate = useNavigate();

  const theme = createTheme();

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <FitnessCenterIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Gotore
          </Typography>
          <nav>
            <Link
              variant='button'
              color='text.primary'
              to='/signup'
              sx={{ my: 1, mx: 1.5 }}
            >
              Sign up
            </Link>
            <Link
              variant='button'
              color='text.primary'
              to='/signin'
              sx={{ my: 1, mx: 1.5 }}
            >
              Sign in
            </Link>
          </nav>
          <Button
            onClick={handleSignOut}
            variant='outlined'
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
