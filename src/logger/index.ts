import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { LogLevel } from "@types";
import { config } from "../";
import { formatDateTime } from "../utils/datetime";
import {getBgPaint, getPaint} from "../utils/paint";

/**
 * Logs a message to the console and log file if `level` is specified
 * @param {string} message text to be logged
 * @param {LogLevel} level optional -  "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "FATAL" | "CRITICAL"
 * @returns {void} void
 */
export function log(message: string, level?: LogLevel): void {
  if (!message || message === "") return;
  logConsole(message, level || config.defaultLevel || "LOG");
  if(config.logToFile) logLocal(message, level ||  config.defaultLevel || "LOG", new Error(message).stack?.split("at ")[2]?.trim()!);
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

function logConsole(message: string | undefined, level: LogLevel): void {
  console.log(
    getBgPaint(level)(` ${level} `),
    getPaint(level)(` ${message} `)
  );
}

// for (let i = 0; i <= 50; i++)
// logError(new Error("This is a test error => " + i));
