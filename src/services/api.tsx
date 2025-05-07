import axios from "axios";

const api = axios.create({
  baseURL: "https://mapadelixoapi-main-9toqgu.laravel.cloud/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default api;
