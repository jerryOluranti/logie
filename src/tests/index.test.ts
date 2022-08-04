import { cwd } from "node:process";
import { config } from "../index";

export function initTestSuite() {
  it("config should be defined", () => {
    expect(config).toBeDefined();
  });

  it("should have valid config values", () => {
    expect(config).toBeDefined();
    expect(typeof config.logName).toBe('string');
    expect(config.logPath).toEqual(process.env.MODE === "DEVELOPMENT" ? "/logs/" : `${cwd().split("node_modules")[0]}/logs/`);
    expect(config.logToFile).toBeTruthy();
  });
}
