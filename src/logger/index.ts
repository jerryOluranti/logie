import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { config } from '../';
require("dotenv").config();

export function LogError(err: Error): void {
  if (!err) return;

  logLocal(err);
}

function logMessage(err: Error): Buffer {
  const logLineDetails = err?.stack?.split("at ")[3]?.trim();
  return Buffer.from(
    `[${new Date().toUTCString()}] => ISSUE, Stack: ${logLineDetails}, ${err}\n\n`,
    "utf-8"
  );
}

function logLocal(err: Error): void {
  let newLog = logMessage(err);

  logConsole(newLog.toString());

  if (!config.log_to_file) return;

  let logs: Buffer;
  const path = config.log_path;

  if (!existsSync(path)) {
    mkdirSync(path);
    logs = Buffer.from(
      `---- LOG HEAD | START DATE: ${new Date().toUTCString()} ----\n\n`,
      "utf-8"
    );
  } else {
    logs = readFileSync(config.log_path + config.log_name);
  }



  newLog = Buffer.concat([logs, newLog]);

  writeFileSync(config.log_path + config.log_name, newLog);
}

export function logConsole(message: string): void {
  console.log(message);
}

// LogError(new Error("This is a test Error!"));
