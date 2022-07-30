import { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, status } = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    status === "succeeded" && (
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {data.get("title")}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {data.get("tags").map((tag) => (
                <span key={tag}>#{tag} </span>
              ))}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {data.get("message")}
            </Typography>
            <Typography variant="h6">
              Created by: {data.get("creator").get("username")}
            </Typography>
            <Typography variant="body1">
              {moment(data.get("createdAt")).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <strong>Comments - coming soon!</strong>
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={`${data.get("postImage")._url}`}
              alt={"post-details"}
            />
          </div>
        </div>
      </Paper>
    )
  );
};

export default PostDetails;
