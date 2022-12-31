import React, { useCallback } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../../lib/api/gotoreAPI";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Link from "@mui/material/Link";

const Header = ({ isSignedIn, currentUser, notificationsCount }) => {
  const navigate = useNavigate();

  const theme = createTheme();

  const handleSignOut = useCallback(async () => {
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
  }, [navigate]);

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
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={"/"}
                sx={{ mt: 1, mx: 3 }}
              >
                <SearchIcon />
              </Link>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={"/notifications"}
                sx={{ mt: 1, mx: 3 }}
              >
                <Badge badgeContent={notificationsCount} color='primary'>
                  <NotificationsIcon />
                </Badge>
              </Link>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={`/chatrooms`}
                sx={{ mt: 1, mx: 3 }}
              >
                <ChatBubbleIcon />
              </Link>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={`/users/${currentUser?.id}`}
                sx={{ ml: 3 }}
              >
                <Avatar src={currentUser?.image.url}>
                  {currentUser?.name.charAt(0)}
                </Avatar>
              </Link>
              <Button onClick={handleSignOut} sx={{ my: 1, mx: 1.5 }}>
                <ExitToAppIcon />
              </Button>
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
