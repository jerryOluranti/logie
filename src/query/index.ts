import { readFile } from "fs/promises";
import { config } from "..";
import { catchAsync } from "../catch";
import { IQueryFactory, Log, ErrorLevel } from "@types";
import { parseDateTime } from "../utils/datetime";

export class Query {
  node = new QueryFactory();

  constructor(protected logPath?: string) {
    this.logPath = logPath || config.logPath;
    this.readFileToBuffer();
  };

  private async readFileToBuffer() {
    const data = await catchAsync(readFile(this.logPath!));

    this.node.parse(data as Buffer);
  }
} 


class QueryFactory implements IQueryFactory {
  size = 0;
  lastLogTime: number | undefined;
  logs: Log[] = [];
  private temp: Log[] = [];

  get() {
    const _temp = this.temp;
    this.temp = [];
    return _temp;
  }

  parse (logBuffer: Buffer) {
    let buf = logBuffer.toString().split('\n').reverse();
    buf.pop();
    buf = buf.reverse();

    this.logs = buf.map(log => {
      const parsedLog = log.split(",");
      return {
        timestamp: parseDateTime(parsedLog[0].split("=>")[0].trim().replace('[', '').replace(']','')),
        level: parsedLog[0].split("=>")[1].trim(),
        stack: parsedLog[1].trim(),
        message: parsedLog[2].trim()
      } as Log
    })

    this.size = this.logs.length;
    this.lastLogTime = this.logs.at(-1)?.timestamp || undefined;
  }

  head(length: number = 5) {
    return this.logs.slice(0, length + 1);
  }

  tail(length: number = 5) {
    return this.logs.slice(this.logs.length - length + 1);
  }

  findByTimeStamp(timestamp: number) {
    return this.logs.find(log => log.timestamp === timestamp)
  }

  findByTimeRange(startTime: number, stopTime: number = 0) {
    if (startTime <= 0) throw new Error("Invalid startTime value");

    if (stopTime === 0) {
      this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime);
      return this;
    }

    this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime && log.timestamp <= stopTime);
    return this;
  }

  findByErrorLevel(level: ErrorLevel) {
    this.temp = (this.temp || this.logs).filter(log => log.level === level);
    return this;
  }

  findByErrorMessage(message: string) {
    this.temp = (this.temp || this.logs).filter(log => log.message.includes(message));
    return this;
  }

  findByStack(stack: string) {
    this.temp = (this.temp || this.logs).filter((log) => log.stack.includes(stack));
    return this;
  }
}
