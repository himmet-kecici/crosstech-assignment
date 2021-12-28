import axios from "axios";
import {
  LOG_ERROR,
  LOG_SUCCESS,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASK_DETAIL_FAIL,
  TASK_DETAIL_REQUEST,
  TASK_DETAIL_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REFRESH,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_UPDATE_SUCCESS,
} from "store/types";

const MESSAGES = {
  createSuccess: "Task create successful.",
  updateSuccess: "Task update successful.",
  completeSuccess: "The task has been marked as Completed.",
  rejectSuccess: "The task has been marked as Rejected.",
  deleteSuccess: "Task delete successful.",
};

export const getTaskList =
  ({ refresh } = {}) =>
  (dispatch) => {
    dispatch({ type: refresh ? TASK_LIST_REFRESH : TASK_LIST_REQUEST });
    axios
      .get("/task")
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_LIST_SUCCESS, payload });
      })
      .catch((error) => {
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  };

export const getTaskDetail = (taskId) => (dispatch) => {
  dispatch({ type: TASK_DETAIL_REQUEST });
  axios
    .get("/task/" + taskId)
    .then((response) => {
      const payload = response?.data?.payload;
      if (!payload) throw new Error(response);

      dispatch({ type: TASK_DETAIL_SUCCESS, payload });
    })
    .catch((error) => {
      dispatch({ type: TASK_DETAIL_FAIL });
      dispatch({ type: LOG_ERROR, payload: error?.response?.data });
    });
};

export const createTask = (params) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: TASK_LIST_REFRESH });
    axios
      .post("/task", params)
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_CREATE_SUCCESS, payload });
        dispatch({ type: LOG_SUCCESS, message: MESSAGES.createSuccess });
        resolve(payload);
      })
      .catch((error) => {
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  });

export const updateTask = (taskId, params) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: TASK_LIST_REFRESH });
    axios
      .put("/task/" + taskId, params)
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_UPDATE_SUCCESS, payload });
        dispatch({ type: LOG_SUCCESS, message: MESSAGES.updateSuccess });
        resolve();
      })
      .catch((error) => {
        debugger;
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  });

export const completeTask = (taskId) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: TASK_LIST_REFRESH });
    axios
      .get("/task/complete/" + taskId)
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_UPDATE_SUCCESS, payload });
        dispatch({ type: LOG_SUCCESS, message: MESSAGES.completeSuccess });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  });

export const rejectTask = (taskId) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: TASK_LIST_REFRESH });
    axios
      .get("/task/reject/" + taskId)
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_UPDATE_SUCCESS, payload });
        dispatch({ type: LOG_SUCCESS, message: MESSAGES.rejectSuccess });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  });

export const deleteTask = (taskId) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({ type: TASK_LIST_REFRESH });
    axios
      .delete("/task/" + taskId)
      .then((response) => {
        const payload = response?.data?.payload;
        if (!payload) throw new Error(response);

        dispatch({ type: TASK_DELETE_SUCCESS, payload });
        dispatch({ type: LOG_SUCCESS, message: MESSAGES.deleteSuccess });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: TASK_LIST_FAIL });
        dispatch({ type: LOG_ERROR, payload: error?.response?.data });
      });
  });

export const resetData = () => (dispatch) => {
  dispatch({ type: TASK_LIST_REFRESH });
  axios
    .get("/task/reset-data")
    .then((response) => {
      const payload = response?.data?.payload;
      if (!payload) throw new Error(response);

      dispatch({ type: TASK_LIST_SUCCESS, payload });
    })
    .catch((error) => {
      dispatch({ type: TASK_LIST_FAIL });
      dispatch({ type: LOG_ERROR, payload: error?.response?.data });
    });
};
