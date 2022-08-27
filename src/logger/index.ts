import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { LogLevel } from "@types";
import { config, pathSeperator } from "../";
import { formatDateTime } from "../utils/datetime";
import {getBgPaint, getPaint} from "../utils/paint";

/**
 * Logs a message to the console and log file if `level` is specified
 * @param {string} message text to be logged
 * @param {LogLevel} level optional -  "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "FATAL" | "CRITICAL"
 * @returns {void} void
 */
export function log(message: string | Error, level?: LogLevel): void {
  if (!message || message === "") return;

  const isError = message instanceof Error;
  const _level = level || (isError ? "ERROR" : (config.defaultLevel || "LOG"));

  const stack = (!isError ? new Error("_") : message).stack!;
  const origin = stack.split("at")[typeof message === "string" ? 2 : 1]?.trim()!;
  const _message =  !isError ? message : message.message;

  logConsole(
    _message,
    _level,
    config.showOrigin ? origin : undefined,
    isError && config.showStackTrace ? stack : undefined
  );

  if((isError || typeof _message !== 'object') && config.logToFile) logLocal(_message, _level, origin)
}

function generate(message: string, level: LogLevel, origin: string): Buffer {
  return Buffer.from(
    `[${formatDateTime(Date.now())}] => ${level}, Origin: ${origin}, Message: ${message}\n`,
    "utf-8"
  );
}

function logLocal(message: string, level: LogLevel, origin: string): void {
  let newLog = generate(message, level, origin);

  let logs: Buffer = Buffer.from([]);
  
  try {
    logs = readFileSync(config.logPath + config.logName);
  } catch (err) {
    if (!existsSync(config.logPath)) {
      mkdirSync(config.logPath, {recursive: true});
    }
    
    logs = Buffer.from(
      `---- LOG HEAD | START DATE: ${formatDateTime(
        Date.now()
      )}} ----\n`,
      "utf-8"
    );
  }

  newLog = Buffer.concat([logs, newLog]);

  writeFileSync(config.logPath + config.logName, newLog);
}

function logConsole(message: any, level: LogLevel, origin?: string, stack?: string): void {
  const _origin = origin ? getPaint(level)("=> ".concat(origin.split(pathSeperator).pop()!.replace(')', ''))) : "";

  if (typeof message === 'object') {
    console.log(
      getBgPaint(level)(` ${level} `),
      _origin.replace('=>','').trim()
    );

    console.dir(message);
  } else {
    console.log(
      getBgPaint(level)(` ${level} `),
      getPaint(level)(` ${message}`),
      _origin
    );
  
    if (stack) console.log(transformStackTrace(stack));
  }
}

function transformStackTrace(stack: string) {
  let stackArr = stack.split('\n');
  stackArr.shift();

  // stackArr = stackArr.map(line => line.trim());

  return stackArr.join("\n");
}