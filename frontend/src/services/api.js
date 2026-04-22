import axios from 'axios';

const API = axios.create({
  baseURL: "https://luminaai-backend.onrender.com/api",
});

export const generateExplanation = (topic) => API.post('/generate', { topic });