import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      token: localStorage.getItem("token") ?? null,
      isAuthenticated: Boolean(localStorage.getItem("token")),
    },
  },
});
