import {ILoggerConfig} from "@types";
require("dotenv").config();

function validateConfig(): ILoggerConfig {
  const configPath = process.env.NODE_ENV === "DEVELOPMENT" ? "../package.json" : "../../../package.json";
  const logPath = "./src/logs/";
  let config: ILoggerConfig | undefined;

  try {
    config = require(configPath).trollerConfig;
  } catch(err) {
    config = undefined;
    // console.log("Could not find config; Using default values...");
  }

  return {
    logName: config?.logName ?? "test.log",
    logPath: config?.logPath ? `../../..${config?.logPath}/logs/` : logPath,
    logToFile: config?.logToFile ?? true
  };
}

export const config = validateConfig();

export * from "./logger";
export * from "./handler";
export * from "./query";

// console.log(validateConfig());