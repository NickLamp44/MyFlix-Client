import { configureStore } from "@reduxjs/toolkit";

// Placeholder for reducers
import moviesReducer from "./slices/moviesSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});
