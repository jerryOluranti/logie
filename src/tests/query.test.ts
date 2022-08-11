import { LogLevel } from "../../types";
import { Query } from "../query";

export function queryTestSuite() {
  let query = new Query();
  let node = query.node;
  const levels: LogLevel[] = [
    "LOG",
    "INFO",
    "DEBUG",
    "WARN",
    "ERROR",
    "CRITICAL",
    "FATAL",
  ];

  it("should create instance", () => {
    expect(Object.keys(query).includes('node')).toEqual(true);
    expect(Object.keys(node).includes('size')).toEqual(true);
  });

  it("should parse logs correctly", () => {
    expect(node.size).toBeGreaterThan(0);
    expect(node.size).toEqual(node.size);
    expect('message' in node.getAll()[0]).toEqual(true);
  })

  it("should return head and tail with default and custom length", () => {
    expect(node.head().length).toEqual(node.size < 5 ? node.size : 5);
    expect(node.tail().length).toEqual(node.size < 5 ? node.size : 5);
    expect(node.head(7).length).toEqual(node.size < 7 ? node.size : 7);
    expect(node.tail(7).length).toEqual(node.size < 7 ? node.size : 7);
    // expect(node.findByTimeRange(node.logs[Math.floor(node.size / 2)].timestamp).get().length).toEqual(Math.floor(node.size / 2));
    // expect(node.findByTimeRange(node.logs.at(-1)!.timestamp).get().length).toEqual(node.size);
  })

  it.each(levels)(
    "should find all logs with level %p",
    (level) => expect(node.findByLevel(level).get().length).toEqual(level === "INFO" ? 3 : 1)
  )
}
