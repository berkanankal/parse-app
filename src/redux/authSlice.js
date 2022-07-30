import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Parse from "parse/dist/parse.min.js";

export const register = createAsyncThunk(
  "auth/register",
  (formInformations, thunkAPI) => {
    const user = new Parse.User();
    user.set(
      "username",
      `${formInformations.name} ${formInformations.surname}`
    );
    user.set("email", formInformations.email);
    user.set("password", formInformations.password);

    return user
      .signUp()
      .then((res) => res)
      .catch((err) => {
        if (!err.response) {
          throw err;
        }

        return thunkAPI.rejectWithValue(err.response.data);
      });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  (formInformations, thunkAPI) => {
    return Parse.User.logIn(formInformations.email, formInformations.password)
      .then((res) => res)
      .catch((err) => {
        if (!err.response) {
          throw err;
        }

        return thunkAPI.rejectWithValue(err.response.data);
      });
  }
);

export const logout = createAsyncThunk("auth/logout", (arg, thunkAPI) => {
  return Parse.User.logOut()
    .then((res) => res)
    .catch((err) => {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    // LOGIN
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // REGISTER
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSignup = true;
      state.error = null;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // LOGOUT
    [logout.pending]: (state) => {
      console.log("pending");
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.logoutError = action.payload.message;
    },
  },
});

export const { resetInitialState, setUser } = authSlice.actions;

export default authSlice.reducer;
