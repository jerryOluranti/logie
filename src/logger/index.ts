import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { config } from "../";
import { formatDateTime } from "../utils/datetime";

export function logError(err: Error): void {
  if (!err) return;
  logLocal(err);
}

function logMessage(err: Error): Buffer {
  const logLineDetails = err?.stack?.split("at ")[1]?.trim();
  return Buffer.from(
    `[${formatDateTime(Date.now())}] => ISSUE, Stack: ${logLineDetails}, ${err}\n`,
    "utf-8"
  );
}

function logLocal(err: Error): void {
  let newLog = logMessage(err);

  if (!config.logToFile) return;

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

export function logConsole(message: string | undefined): void {
  console.log(message);
}

// for (let i = 0; i <= 50; i++)
// logError(new Error("This is a test error => " + i));
