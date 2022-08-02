import { exec } from "node:child_process";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { logError } from "../logger";
import { config, catchSync } from "../";
import { parseDateTime, formatDateTime } from "../utils/datetime";

export function loggerTestSuite() {
  let logData: string[] | undefined;
  let testLog: string[] | undefined;
  beforeAll(() => {
    // delete the logs dir if it exists
    if (existsSync(config.logPath)) {
      exec(`rm -r ${config.logPath}`, (err, _) => {
        if (err) throw new Error(err.message);
      });
    }

    // log test error
    logError(new Error("This is from tests"));

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
  });

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
      .replace(" => ISSUE", "")
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
