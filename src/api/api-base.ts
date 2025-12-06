import axios from "axios";

import { config } from "../config";

// Base Axios instance
const API_BASE_URL = !config.backend_port
  ? config.backend_url
  : config.backend_url + ":" + config.backend_port;

const apiBase = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Per includere i cookie automaticamente
});

export default apiBase;
