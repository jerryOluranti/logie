import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { LogLevel } from "@types";
import { config } from "../";
import { formatDateTime } from "../utils/datetime";

/**
 * Logs a message to the console and log file if `level` is specified
 * @param {string} message text to be logged
 * @param {LogLevel} level optional -  "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "FATAL" | "CRITICAL"
 * @returns {void}
 */
export function log(message: string, level?: LogLevel): void {
  if (!message || message === "") return;
  logConsole(message);
  if(level && config.logToFile) logLocal(message, level);
}

function logToFile(message: string, level: LogLevel): Buffer {
  const err = new Error(message);
  const logLineDetails = err?.stack?.split("at ")[1]?.trim();
  return Buffer.from(
    `[${formatDateTime(Date.now())}] => ${level}, Origin: ${logLineDetails}, Message: ${message}\n`,
    "utf-8"
  );
}

function logLocal(message: string, level: LogLevel): void {
  let newLog = logToFile(message, level);

  let logs: Buffer = Buffer.from([]);

  try {
    logs = readFileSync(config.logPath + config.logName);
  } catch (err) {
    if (!existsSync(config.logPath))
      mkdirSync(config.logPath);
    
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

function logConsole(message: string | undefined): void {
  console.log(message);
}

// for (let i = 0; i <= 50; i++)
// logError(new Error("This is a test error => " + i));
