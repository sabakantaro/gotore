import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../../lib/api/gotoreAPI";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Link from "@mui/material/Link";

const Header = ({ isSignedIn, currentUser }) => {
  const navigate = useNavigate();

  const theme = createTheme();

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res) {
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
            <Link
              href='/'
              variant='body'
              style={{ color: "black", textDecoration: "none" }}
            >
              Gotore
            </Link>
          </Typography>
          {isSignedIn ? (
            <>
              <Button
                onClick={handleSignOut}
                variant='outlined'
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign out
              </Button>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={`/users/${currentUser?.id}`}
              >
                <Avatar sx={{ backgroundColor: "#3f50b5" }}>
                  {currentUser?.name.charAt(0)}
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Button
                variant='outlined'
                sx={{ my: 1, mx: 1.5 }}
                component={RouterLink}
                to='/signup'
              >
                Sign up
              </Button>
              <Button
                variant='outlined'
                sx={{ my: 1, mx: 1.5 }}
                component={RouterLink}
                to='/signin'
              >
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
