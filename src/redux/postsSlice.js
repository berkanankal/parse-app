import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Parse from "parse/dist/parse.min.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const query = new Parse.Query("Post");
  return await query.find();
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const query = new Parse.Query("Post");
    return await query.get(id);
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formInformations, thunkAPI) => {
    const Post = new Parse.Object("Post");
    Post.set(formInformations);

    return await Post.save();
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data, thunkAPI) => {
    const query = new Parse.Query("Post");
    const post = await query.get(data.id);
    post.set(data);

    return await post.save();
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const Post = new Parse.Object("Post");
  Post.set("objectId", id);
  const post = await Post.destroy();
  return post.id;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    post: {
      data: {},
      status: "idle",
      error: null,
    },
    numberOfPages: 0,
    page: 1,
    searchQuery: "",
    totalPosts: 0,
    limit: 0,
    currentId: null,
    error: null,
  },
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    [fetchPostById.pending]: (state, action) => {
      state.post.status = "loading";
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.post.status = "succeeded";
      state.post.data = action.payload;
    },
    [createPost.pending]: (state, action) => {
      console.log("pending");
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    },
    [updatePost.pending]: (state, action) => {
      console.log("pending");
    },
    [updatePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    [deletePost.pending]: (state, action) => {
      console.log("pending");
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setCurrentId, resetErrorMessage, setPage, setSearchQuery } =
  postsSlice.actions;

export default postsSlice.reducer;
