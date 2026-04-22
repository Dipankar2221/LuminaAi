import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

export const generateExplanation = (topic) =>
  API.post("/generate", { topic });