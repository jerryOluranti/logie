import { cwd } from "process";
import {ILoggerConfig} from "@types";
require("dotenv").config();

function init(): ILoggerConfig {
  let config: ILoggerConfig | undefined;
  
  try {
    let path = "";
    if (process.env.DEV_MODE === "DEVELOPMENT") {
      path = "../package.json";
    }else {
      path = cwd().split("node_modules")[0].concat("/package.json");
    }
    config = require(path).logie;
  } catch(err) {
    config = undefined;
  }

  return {
    logName: config?.logName ?? "test.log",
    logPath: process.env.DEV_MODE !== "DEVELOPMENT" ? `${cwd().split("node_modules")[0]}${config?.logPath || "/"}/logs/` : "/logs/",
    logToFile: config?.logToFile ?? false,
  };
}

// const cfg = init();
export const config = init();
// export const config = cfg;

export * from "./logger";
export * from "./catch";
export * from "./query";

// console.log(cfg);