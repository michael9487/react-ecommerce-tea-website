import axios from "axios";

const api = axios.create({
  baseURL: "https://vue-course-api.hexschool.io",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
