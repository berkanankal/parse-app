import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/authSlice";

const Auth = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Name is required"),
    surname: Yup.string()
      .min(2, "Surname must be at least 2 characters")
      .max(30, "Surname must be at most 30 characters")
      .required("Surname is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must be at most 32 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-Password is required"),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: isSignupForm ? registerSchema : loginSchema,
    onSubmit: (values) => {
      if (isSignupForm) {
        console.log(values);

        dispatch(register(values));
      } else {
        // const loginForm = { email: values.email, password: values.password };
        // dispatch(login(loginForm));
      }
    },
  });

  const switchMode = () => {
    resetForm();
    setIsSignupForm(!isSignupForm);
    setShowPassword(false);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignupForm ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {isSignupForm && (
              <>
                <Input
                  name="name"
                  value={values.name}
                  label="First Name"
                  handleChange={handleChange}
                  half
                  error={errors.name && touched.name ? true : false}
                  helperText={errors.name && touched.name ? errors.name : null}
                  onBlur={handleBlur}
                />
                <Input
                  name="surname"
                  value={values.surname}
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  error={errors.surname && touched.surname ? true : false}
                  helperText={
                    errors.surname && touched.surname ? errors.surname : null
                  }
                  onBlur={handleBlur}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              onBlur={handleBlur}
              handleChange={handleChange}
              value={values.email}
              type="email"
              error={errors.email && touched.email ? true : false}
              helperText={errors.email && touched.email ? errors.email : null}
            />
            <Input
              name="password"
              value={values.password}
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              onBlur={handleBlur}
            />
            {isSignupForm && (
              <Input
                name="rePassword"
                value={values.rePassword}
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                error={errors.rePassword && touched.rePassword ? true : false}
                helperText={
                  errors.rePassword && touched.rePassword
                    ? errors.rePassword
                    : null
                }
                onBlur={handleBlur}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignupForm ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignupForm
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
