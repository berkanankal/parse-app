import { useState } from "react";
import { AppBar, TextField, Button, Chip } from "@mui/material";
import useStyles from "./styles";
const SearchForm = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <TextField
        name="search"
        variant="outlined"
        label="Search Memories"
        fullWidth
      />
      <Button
        style={{ margin: "10px 0" }}
        variant="contained"
        color="primary"
        fullWidth
      >
        Search
      </Button>
    </AppBar>
  );
};

export default SearchForm;
