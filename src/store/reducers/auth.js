import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "store/types";
import { getMockUserImageUrl } from "utils/auth";

const initialState = {
  requesting: false,
  initLoaded: false,
  loggedIn: false,
  user: {
    id: null,
    name: null,
    email: null,
    department: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case LOGIN_SUCCESS:
      const newUser = action.payload;
      newUser.imageUrl = getMockUserImageUrl(newUser.id);
      return {
        ...state,
        requesting: false,
        initLoaded: true,
        loggedIn: true,
        user: newUser,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        requesting: false,
        initLoaded: true,
        loggedIn: false,
        user: initialState.user,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: initialState.user,
      };
    default:
      return state;
  }
};

export const selectAuth = () => (state) => state.auth;

export default authReducer;
