// src/api.js (Frontend)
import axios from "axios";

const api = axios.create({
  baseURL: "https://mrad.onrender.com/api", // Render backend URL
  withCredentials: true, // if backend uses cookies
});

export default api;
