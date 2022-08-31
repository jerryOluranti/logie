import { config } from "../";

export function initTestSuite() {

  it("config should be defined", () => {
    expect(config).toBeDefined();
  });

  it("should have valid config values", () => {

    expect(config).toBeDefined();
    expect(typeof config.logName).toBe('string');
    expect(config.logPath).toContain("/logs/");
    expect(typeof config.logToFile).toEqual("boolean");
  });
}
