import { readFileSync } from 'node:fs';
import { catchSync, logConsole } from ".";

function validateConfig(): ILoggerConfig {
  const { data, error } = catchSync(readFileSync("./config.json"));

  let config = {} as ILoggerConfig;

  if (data) {
    config = JSON.parse(data.toString());
  }

  if (error) logConsole("Could not find config file; Using default values...");

  return {
    log_name: config.log_name ?? "test-log",
    log_path: config.log_path ?? __dirname?.replace("error", "") + "app-logs/",
    max_size: config.max_size ?? 10240,
    log_to_file: config.log_to_file ?? true
  };
}

export const config = validateConfig();

export * from "./logger";
export * from "./error-handler";
