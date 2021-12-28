import axios from "axios";

const initAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP__API_BASE_URL;

  const token = localStorage.getItem("token");
  if (token) setAxiosDefaultToken(token);
};

export const setAxiosDefaultToken = (token) => {
  axios.defaults.headers.common["Authorization"] = token && `Bearer ${token}`;
};

export default initAxios;
