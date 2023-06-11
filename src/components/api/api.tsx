import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.38/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default api;
