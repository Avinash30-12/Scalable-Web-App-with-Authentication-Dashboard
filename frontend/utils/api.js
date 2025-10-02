import axios from "axios";

const API = axios.create({
  baseURL: "https://scalable-web-app-with-authentication.onrender.com/api",
});

// Attach token automatically if present
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;
