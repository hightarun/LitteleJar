import axios from "axios";

const api = axios.create({
  baseURL: `https://${process.env.baseUrl}/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;
