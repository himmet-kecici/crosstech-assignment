import { createSelector } from "reselect";

import { getMockUserImageUrl } from "utils/auth";
import {
  TASK_LIST_REQUEST,
  TASK_LIST_REFRESH,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_CREATE_SUCCESS,
  TASK_UPDATE_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASK_LIST_SEARCH,
  TASK_LIST_FILTER,
} from "store/types";
import { TASK_FILTERS } from "constants";

const initialState = {
  requesting: false,
  updating: false,
  list: [],
  search: "",
  filter: TASK_FILTERS.all,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return {
        ...state,
        requesting: true,
        updating: false,
      };

    case TASK_LIST_REFRESH:
      return {
        ...state,
        requesting: false,
        updating: true,
      };

    case TASK_LIST_SUCCESS:
      return {
        ...state,
        requesting: false,
        updating: false,
        list: action.payload.map((task) => {
          task.user.imageUrl = getMockUserImageUrl(task.user.id);
          return task;
        }),
      };

    case TASK_LIST_FAIL:
      return {
        ...state,
        requesting: false,
        updating: false,
      };

    case TASK_CREATE_SUCCESS:
      const newTask = action.payload;
      newTask.user.imageUrl = getMockUserImageUrl(newTask.user.id);
      return {
        ...state,
        requesting: false,
        updating: false,
        list: [...state.list, newTask],
      };

    case TASK_UPDATE_SUCCESS:
      const updatedTask = action.payload;
      const updatedList = [...state.list];
      const foundIndex = updatedList.findIndex((t) => t.id === updatedTask.id);
      if (foundIndex !== -1) {
        updatedTask.user.imageUrl = getMockUserImageUrl(updatedTask.user.id);
        updatedList[foundIndex] = updatedTask;
      }
      return {
        ...state,
        requesting: false,
        updating: false,
        list: updatedList,
      };

    case TASK_DELETE_SUCCESS:
      const delTask = action.payload;
      return {
        ...state,
        requesting: false,
        updating: false,
        list: state.list.filter((t) => t.id !== delTask.id),
      };

    case TASK_LIST_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case TASK_LIST_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};

export const selectTasks = () => (state) => state.task;

export const selectFilteredTaskList = createSelector(
  (state) => state.auth.user,
  (state) => state.task.list,
  (state) => state.task.filter,
  (state) => state.task.search,
  (user, list, filter, search) => {
    if (!list.length || (filter === TASK_FILTERS.all && !search)) return list;
    let filteredList = list;

    if (filter === TASK_FILTERS.myTasks) {
      filteredList = list.filter((t) => t.user.id === user.id);
    } else if (filter === TASK_FILTERS.myDepTasks) {
      filteredList = list.filter(
        (t) => t.assignedDepartment === user.department
      );
    }

    if (search) {
      filteredList = filteredList.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredList;
  }
);

export default taskReducer;
