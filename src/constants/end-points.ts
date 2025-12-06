import { config } from "../config";

const url = !config.backend_port
  ? config.backend_url
  : config.backend_url + ":" + config.backend_port;

export const FILTER_PORTFOLIO = url + "/portfolio"; // GET
export const GET_COMPANY = url + "/company"; // GET
