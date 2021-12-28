import axios from "axios";
import {
  LOG_ERROR,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "store/types";
import { getToken, removeToken, setToken } from "utils/auth";

export const init = () => (dispatch) =>
  new Promise((resolve) => {
    if (!getToken()) return dispatch({ type: LOGIN_FAIL });
    dispatch(getMe()).then(resolve);
  });

export const getMe = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: LOGIN_REQUEST });
    axios
      .get("/auth/me")
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);
        dispatch({ type: LOGIN_SUCCESS, payload });
        resolve();
      })
      .catch((error) => {
        removeToken();
        dispatch({ type: LOGIN_FAIL });
        reject(error);
      });
  });

export const login =
  ({ email }) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({ type: LOGIN_REQUEST });
      axios
        .post("/auth/login", { email })
        .then((response) => {
          const payload = response?.data?.payload;
          if (!payload) throw new Error(response);
          setToken(payload.jwtToken);
          dispatch({ type: LOGIN_SUCCESS, payload });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: LOGIN_FAIL });
          dispatch({ type: LOG_ERROR, payload: error?.response?.data });
          reject(error);
        });
    });

export const logout = () => (dispatch) => {
  setToken();
  dispatch({ type: LOGOUT });
};
