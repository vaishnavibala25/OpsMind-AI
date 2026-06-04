import axios from "axios";

const API = axios.create({
  baseURL: "https://opsmind-backend-fyu8.onrender.com"
});

export default API;