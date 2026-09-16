import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_BASE_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = `Bearer`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
