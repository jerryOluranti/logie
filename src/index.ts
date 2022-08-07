import { cwd } from "node:process";
import { platform } from "node:os";
import { ILoggerConfig } from "@types";
require("dotenv").config();

const pathSeperator = platform() === "win32" ? "\\" : "/";

function init(): ILoggerConfig {
  let config: ILoggerConfig | undefined;

  try {
    let path = "";
    if (process.env.DEV_MODE === "DEVELOPMENT") {
      path = `..${pathSeperator}package.json`;
    } else {
      path = cwd()
        .split("node_modules")[0]
        .concat(pathSeperator, "package.json");
    }
    config = require(path).logie;
  } catch (err) {
    config = undefined;
  }

  return {
    logName: config?.logName ? formatLogName(config.logName) : "test.log",
    logPath:
      process.env.DEV_MODE !== "DEVELOPMENT"
        ? formatPath(config?.logPath ? config.logPath : "")
        : `${pathSeperator}logs`,
    logToFile: config?.logToFile ?? false,
    defaultLevel: config?.defaultLevel
  };
}

function formatPath(path: string) {
  let formated = path.trim();
  let wd = cwd().split("node_modules")[0];

  if (!(formated.charAt(0) === pathSeperator))
    formated = pathSeperator.concat(path);
  if (!(formated.charAt(formated.length - 1) === pathSeperator))
    formated = formated.concat(pathSeperator);

  if (wd.lastIndexOf(pathSeperator[0]) === wd.length - 1)
    wd = wd.slice(0, wd.length - 1);

  return wd
    .concat(formated)
    .concat("logs", pathSeperator)
    // .replaceAll(/(\s+)/g, String.fromCharCode(92).concat(" "));
}

function formatLogName(name: string) {
  return name.endsWith(".log") ? name : name.concat(".log");
}

export const config = init();

export * from "./logger";
export * from "./catch";
export * from "./query";

// console.log(cfg);
