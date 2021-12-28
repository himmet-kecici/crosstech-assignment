import { TOKEN_LOCAL_STORAGE_KEY } from "constants";
import { setAxiosDefaultToken } from "./axios";

export const getToken = () => {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
  setAxiosDefaultToken(token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
  setAxiosDefaultToken();
};

export const getMockUserImageUrl = (userId) => {
  return userId % 2 ? "/profile-1.jpg" : "/profile-2.jpg";
};
