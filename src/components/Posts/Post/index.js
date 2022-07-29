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
import useStyles from "./styles";
import moment from "moment";
import { setCurrentId } from "../../../redux/postsSlice";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/postsSlice";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Typography variant="h6">{post.get("creator")}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2} name="edit">
          <Button
            style={{ color: "white" }}
            onClick={(e) => {
              e.stopPropagation();
              handleSetCurrentId(post.id);
            }}
          >
            <MoreHorizIcon />
          </Button>
        </div>

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
        <Button
          size="small"
          color="secondary"
          onClick={() => handleDelete(post.id)}
        >
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
