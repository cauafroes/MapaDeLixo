import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.16/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default api;
