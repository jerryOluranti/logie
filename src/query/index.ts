import { readFileSync } from "node:fs";
import { config } from "..";
import { catchSync } from "../catch";
import { QueryFactory as IQueryFactory, Log, LogLevel } from "@types";
import { parseDateTime } from "../utils/datetime";

export class Query {
  node = new QueryFactory();

  constructor(protected logPath?: string) {
    this.logPath = logPath || config.logPath;
    this.readFileToBuffer();
  };

  private readFileToBuffer() {
    const data = catchSync(readFileSync(this.logPath!.concat(config.logName)), () => {}, true);

    this.node.parse(data as Buffer);
  }
} 


class QueryFactory implements IQueryFactory {
  size = 0;
  lastLogTime: number | undefined;
  startDate: number | undefined;
  private logs: Log[] = [];
  private temp: Log[] | undefined;

  get() {
    const _temp = this.temp || [];
    this.temp = undefined;
    return _temp;
  }

  getAll() {
    return this.logs;
  }
  parse (logBuffer: Buffer) {
    let buf = logBuffer.toString().split('\n').reverse();
    buf.pop();
    buf = buf.reverse();
    buf.pop();

    this.logs = buf.map(log => {
      const parsedLog = log.split(",");
      return {
        timestamp: parseDateTime(parsedLog[0].split("=>")[0].trim().replace('[', '').replace(']','')),
        level: parsedLog[0].split("=>")[1].trim(),
        origin: parsedLog[1].trim().replace("Origin: ", ""),
        message: parsedLog[2].trim().replace("Message: ", "")
      } as Log
    })

    this.size = this.logs.length;
    this.lastLogTime = this.logs.at(-1)?.timestamp || undefined;
    this.startDate = this.logs[0].timestamp;
  }

  head(length: number = 5) {
    return this.logs.slice(0, length);
  }

  tail(length: number = 5) {
    return this.logs.slice(-1 * length);
  }

  // findByTimeStamp(timestamp: number) {
  //   if(timestamp < this.startDate!) { 
  //     this.temp = [];
  //     return this;
  //   }
  //   this.temp = this.temp.filter(log => {
  //     const diff = Math.floor((log.timestamp - timestamp) / 1000 / 60 / 60 / 24);
  //     console.log(diff);
  //     if(diff >= 0 && diff <= 1) return log;
  //   })

  //   return this;
  // }

  findByTimeRange(startTime: number, stopTime: number = 0) {
    if (stopTime === 0) {
      this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime);
      return this;
    }

    this.temp = (this.temp || this.logs).filter(log => log.timestamp >= startTime && log.timestamp <= stopTime);
    console.log(this.temp);
    return this;
  }

  findByLevel(level: LogLevel) {
    this.temp = (this.temp || this.logs).filter(log => log.level === level);
    return this;
  }

  findByMessage(message: string) {
    this.temp = (this.temp || this.logs).filter(log => log.message.includes(message));
    return this;
  }

  findByOrigin(origin: string) {
    this.temp = (this.temp || this.logs).filter((log) => log.origin.includes(origin));
    return this;
  }
}
