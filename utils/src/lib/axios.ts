import axios from 'axios';

export const musicaAxios = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  timeout: 5000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});
