import { LOG_ERROR, LOG_SUCCESS } from "store/types";

const initialState = {
  logQueue: [],
};

const logReducer = (
  state = initialState,
  { type, message, payload = { message } }
) => {
  switch (type) {
    case LOG_ERROR:
      return {
        ...state,
        logQueue: [{ ...payload, type: "error" }, ...state.logQueue],
      };
    case LOG_SUCCESS:
      return {
        ...state,
        logQueue: [{ ...payload, type: "success" }, ...state.logQueue],
      };
    default:
      return state;
  }
};

export const selectLog = () => (state) => state.log;

export default logReducer;
