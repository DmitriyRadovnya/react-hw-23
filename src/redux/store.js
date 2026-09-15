import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { todoReducer } from "./reducers/todoReducer";
import { apiReducer } from "./reducers/apiReducer";
import { loggerMiddleware } from "./loggerMiddleware";

const rootReducer = combineReducers({
  base: todoReducer,
  api: apiReducer,
});

export const todoStore = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware),
);
