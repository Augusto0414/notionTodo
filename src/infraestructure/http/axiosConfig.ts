import axios from "axios";

const api = axios.create({
  baseURL: "https://apitodo-g3vq.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
