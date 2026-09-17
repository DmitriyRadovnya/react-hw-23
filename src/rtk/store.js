import { configureStore } from "@reduxjs/toolkit";
// import tasksReducer from "./tasksSlice";
// import filterReducer from "./filterSlice";
import { api } from "./rtk-query/apiSlice";

export const store = configureStore({
  reducer: {
    // tasks: tasksReducer,
    // filter: filterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
