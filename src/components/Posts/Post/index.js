import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import useStyles from "./styles";
import moment from "moment";
import { setCurrentId } from "../../../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../redux/postsSlice";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleSetCurrentId = (id) => {
    dispatch(setCurrentId(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const openPostDetails = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={() => openPostDetails(post.id)}
      >
        <CardMedia
          className={classes.media}
          image={`${post.get("postImage")._url}`}
          title="xxxxxxxxxx"
        />
        <div className={classes.overlay}>
          <Typography variant="h6">
            {post.get("creator").get("username")}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user && user.id === post.get("creator").id && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSetCurrentId(post.id);
              }}
              style={{ color: "white" }}
            >
              <MoreHorizIcon />
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.get("tags").map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.get("title")}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.get("message").split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {user && user.id === post.get("creator").id && (
          <Button
            size="small"
            color="secondary"
            onClick={() => handleDelete(post._id)}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
