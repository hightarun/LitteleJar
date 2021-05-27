import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.baseUrl}/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;
