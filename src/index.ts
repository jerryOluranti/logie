import { cwd } from "process";
import {ILoggerConfig} from "@types";
require("dotenv").config();

function init(): ILoggerConfig {
  let config: ILoggerConfig | undefined;
  
  try {
    let path = "";
    if (process.env.MODE === "DEVELOPMENT") {
      path = "../package.json";
    }else {
      if(cwd().includes("node_modules")) {
        path = cwd().split("node_modules")[0].concat("package.json");
      }
    }
    config = require(path).trollerConfig;
  } catch(err) {
    config = undefined;
    console.log("Could not read config from package.json. Using default config...");
  }

  return {
    logName: config?.logName ?? "test.log",
    logPath: process.env.MODE !== "DEVELOPMENT" ? `${cwd().split("node_modules")[0]}/logs/` : "/logs/",
    logToFile: config?.logToFile ?? true,
  };
}

// const cfg = init();
export const config = init();
// export const config = cfg;

export * from "./logger";
export * from "./catch";
export * from "./query";

// console.log(cfg);