import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
