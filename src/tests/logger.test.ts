import path from "node:path";
import { existsSync, readFileSync, rm, rmSync } from "node:fs";
import { log } from "../logger";
import { config } from "../";
import {catchSync} from "../catch"
import { parseDateTime, formatDateTime } from "../utils/datetime";
import snooze from "../utils/snooze";
import { LogLevel } from "../../types";

export function loggerTestSuite() {
  let logData: string[] | undefined;
  let testLog: string[] | undefined;

  // delete the logs dir if it exists
  if (existsSync(config.logPath)) {
    rmSync(config.logPath, {recursive: true});
  }

  const levels: Array<LogLevel | undefined> = ["LOG", "INFO", "DEBUG", "WARN", "ERROR", "CRITICAL", "FATAL", undefined, undefined];

  // log test error
  levels.forEach((l, i) => {
    snooze(5000);
    log("This is from tests: " + i, l)
  })
  
  // read log file
  logData = catchSync(
    readFileSync(config.logPath + config.logName),
    null,
    true
  )
    ?.toString()
    .split("\n");

  logData?.pop();
  testLog = logData?.pop()!.split(",");

  it("should create logs dir", () => {
    expect(existsSync(config.logPath)).toEqual(true);
  });

  it("should create and write to test.log file", () => {
    expect(logData).toBeDefined();
    expect(logData?.toString()).not.toEqual("");
  });

  it("should have correct timestamp", () => {
    const time = testLog
      ?.at(0)!
      .split("=>")
      .at(0)!
      .trim()
      .replace("[", "")
      .replace("]", "");
    const parsed = parseDateTime(time!);

    expect(typeof parsed).toEqual("number");

    expect(formatDateTime(parsed)).toEqual(time);
  });

  it("should have correct stack trace origin", () => {
    const stack = testLog?.at(1)!.trim();
    expect(stack).toContain(path.basename(__filename));
  });
}
