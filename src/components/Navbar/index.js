import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.get("username")}
              src="deneme"
            >
              {user.get("username").charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.get("username")}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className={classes.loginBtn}
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
