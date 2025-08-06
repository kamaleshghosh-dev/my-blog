import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import postSlice from "./postslice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});

export default store;
