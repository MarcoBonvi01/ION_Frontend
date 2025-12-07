import { getSiteURL } from "./lib/get-site-url";
import { LogLevel, type LogLevelType } from "./lib/logger";

export interface Settings {
  site: {
    name: string;
    description: string;
    colorScheme: string;
    themeColor: string;
    primaryColor: string;
    url: string;
    version: string;
  };
  logLevel: LogLevelType;
  backend_url: string;
  backend_port: string;
}

export const config: Settings = {
  site: {
    name: "ION Dashboard",
    description: "website to view portfolio",
    colorScheme: "light",
    themeColor: "#3C75DF",
    primaryColor: "#3C75DF",
    url: getSiteURL(),
    version: import.meta.env.VITE_SITE_VERSION || "1.0.0",
  },
  logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
  backend_url: import.meta.env.VITE_BACKEND_URL,
  backend_port: import.meta.env.VITE_BACKEND_PORT,
};
