import axios from "axios";

const api = axios.create({
  baseURL: "https://froesmhs.com/mapalixoapi/public/api/",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default api;
