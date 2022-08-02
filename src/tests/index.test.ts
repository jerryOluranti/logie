import { config } from "../index";

export function initTestSuite() {
  it("config should be defined", () => {
    expect(config).toBeDefined();
  });

  it("should have valid config values", () => {
    expect(config).toBeDefined();
    expect(config.logName).toEqual("test.log");
    expect(config.logPath).toEqual("./src/logs/");
    expect(config.logToFile).toBeTruthy();
  });
}
