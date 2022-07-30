import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PostDetails from "./components/PostDetails";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Parse from "parse/dist/parse.min.js";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";

const { REACT_APP_PARSE_APPLICATION_ID, REACT_APP_PARSE_JAVASCRIPT_KEY } =
  process.env;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize(
  REACT_APP_PARSE_APPLICATION_ID,
  REACT_APP_PARSE_JAVASCRIPT_KEY
);
Parse.serverURL = PARSE_HOST_URL;

const App = () => {
  const dispatch = useDispatch();

  const currentUser = Parse.User.current();

  if (currentUser) {
    dispatch(setUser(currentUser));
  }

  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
