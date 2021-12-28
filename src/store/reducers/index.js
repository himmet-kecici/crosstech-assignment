import { combineReducers } from "redux";
import authReducer from "./auth";
import logReducer from "./log";
import taskReducer from "./task";
import taskDetailReducer from "./taskDetail";

const reducers = combineReducers({
  auth: authReducer,
  log: logReducer,
  task: taskReducer,
  taskDetail: taskDetailReducer,
});

export default reducers;
