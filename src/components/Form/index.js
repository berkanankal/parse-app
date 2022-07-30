import { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost, setCurrentId, updatePost } from "../../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentId, posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [formInformations, setFormInformations] = useState({
    title: "",
    message: "",
    tags: [],
  });

  useEffect(() => {
    if (currentId) {
      const post = posts.find((p) => p.id === currentId);
      setFormInformations(post.attributes);
    }
  }, [currentId, posts]);

  const PostSchema = Yup.object().shape({
    title: Yup.string().required("Zorunlu alan"),
    message: Yup.string().required("Zorunlu alan"),
  });

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: formInformations,
    enableReinitialize: true,
    validationSchema: PostSchema,
    onSubmit: (values) => {
      if (currentId) {
        values.id = currentId;
        dispatch(updatePost(values));
      } else {
        values.creator = user;
        dispatch(createPost(values));
      }
      clearInputs();
    },
  });

  const clearInputs = () => {
    resetForm();
    dispatch(setCurrentId(null));
    setFormInformations({
      creator: "",
      title: "",
      message: "",
      tags: [],
    });
  };

  const handleTagsInput = (e) => {
    setFieldValue("tags", e.target.value.trim().split(","));
  };

  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing memory` : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          error={errors.title && touched.title ? true : false}
          helperText={errors.title && touched.title ? errors.title : null}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.message}
          error={errors.message && touched.message ? true : false}
          helperText={errors.message && touched.message ? errors.message : null}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          onChange={handleTagsInput}
          value={values.tags}
        />
        <div className={classes.fileInput}>
          <input type="file" />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={clearInputs}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;
