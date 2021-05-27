import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.baseUrl}/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;
