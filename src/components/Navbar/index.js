import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();

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
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt="xxx" src="deneme">
            xxx
          </Avatar>
          <Typography className={classes.userName} variant="h6">
            xxx
          </Typography>
          <Button
            variant="contained"
            className={classes.logout}
            color="secondary"
          >
            Logout
          </Button>
        </div>
        <Button
          className={classes.loginBtn}
          component={Link}
          to="/auth"
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
