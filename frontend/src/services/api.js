import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const generateExplanation = (topic) => API.post('/generate', { topic });