import React from "react";
import { Container, Grow, Grid, Paper } from "@mui/material";
import Posts from "../Posts";
import Form from "../Form";
import useStyles from "./styles";
// import Pagination from "../Pagination";
import SearchForm from "../SearchForm";

const Home = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <SearchForm /> */}

            <Form />

            {/* <Paper className={classes.pagination} elevation={6}>
              <Pagination />
            </Paper>  */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
