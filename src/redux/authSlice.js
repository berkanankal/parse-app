import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import decode from "jwt-decode";
import Parse from "parse/dist/parse.min.js";

export const register = createAsyncThunk(
  "auth/register",
  async (formInformations, thunkAPI) => {
    const User = new Parse.Object("Person");
    const { name, surname, email, password } = formInformations;
    User.set("name", name);
    User.set("surname", surname);
    User.set("email", email);
    User.set("password", password);

    const user = await User.save();
    console.log(user);
  }
);

let user = null;
const token = localStorage.getItem("token");

if (token) {
  const decodedToken = decode(token);
  if (!(decodedToken.exp * 1000 < new Date().getTime())) {
    user = decodedToken;
  } else {
    localStorage.removeItem("token");
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    isSignup: false,
    isLoading: false,
    isLoggedIn: false,
    error: null,
    logoutError: null,
  },
  reducers: {
    resetInitialState: (state) => {
      state.isSignup = false;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: {
    // REGISTER
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSignup = true;
      state.error = null;
    },
  },
});

export const { resetInitialState } = authSlice.actions;

export default authSlice.reducer;
