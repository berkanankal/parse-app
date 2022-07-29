import { useState } from "react";
import { Grid, CircularProgress, Alert } from "@mui/material";
import Post from "./Post";
import useStyles from "./styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/postsSlice";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress disableShrink size={50} />
      </div>
    );
  }

  if (status === "succeeded" && posts.length === 0) {
    return <Alert severity="error">No posts found</Alert>;
  }

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item xs={12} sm={12} md={6} lg={4} key={post.id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
