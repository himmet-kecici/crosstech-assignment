import {
  TASK_DETAIL_REQUEST,
  TASK_DETAIL_SUCCESS,
  TASK_DETAIL_FAIL,
  TASK_DETAIL_RESET,
} from "store/types";
import { getMockUserImageUrl } from "utils/auth";

const initialState = {
  requesting: true,
  actionRequesting: false,
  data: null,
};

const taskDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_DETAIL_REQUEST:
      return {
        ...state,
        requesting: true,
        data: initialState.data,
      };

    case TASK_DETAIL_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: {
          ...action.payload,
          user: {
            ...action.payload.user,
            imageUrl: getMockUserImageUrl(action.payload.user.id),
          },
        },
      };

    case TASK_DETAIL_RESET:
      return initialState;

    case TASK_DETAIL_FAIL:
      return {
        ...state,
        requesting: false,
        data: initialState.data,
      };

    default:
      return state;
  }
};

export const selectTaskDetail = () => (state) => state.taskDetail;

export default taskDetailReducer;
