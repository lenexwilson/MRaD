import axios from "axios";

const API_BASE =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://api.mrad.co.in"; // fallback for safety

console.log("🔌 API BASE:", API_BASE);

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true,
});

export default api;
