import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/posts";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer YOUR_ACCESS_TOKEN`,
  },
});
