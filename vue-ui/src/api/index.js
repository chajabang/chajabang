import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    // baseURL: process.env.API_BASE_URL,
    baseURL: "http://localhost:9999",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
export { apiInstance };
