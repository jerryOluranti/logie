import { readFile } from "fs/promises";
import { config } from "..";
import { catchAsync } from "../error-handler";


export class Query {
  protected logFactory = new LogFactory();

  constructor(protected logPath: string) {
    this.logPath = logPath || config.log_path;
    this.readFileToBuffer();
  };

  private async readFileToBuffer() {
    const {data, error} = await catchAsync(readFile(this.logPath));

    this.logFactory.parse(data as Buffer);
  }

  
}


class LogFactory implements ILogFactory {
  size = 0;
  lastLogTime: number | undefined = 0;
  logs = [] as Log[];

  parse (logBuffer: Buffer) {
    let buf = logBuffer.toString().split('\n\n').reverse();
    buf.pop();
    buf = buf.reverse();

    this.logs = buf.map(log => {
      const parsedLog = log.split(",");
      return {
        timestamp: new Date(parsedLog[0].split("=>")[0].trim().replace('[', '').replace(']','')).getMilliseconds(),
        level: parsedLog[0].split("=>")[1].trim(),
        stack: parsedLog[1].trim(),
        message: parsedLog[2].trim()
      } as Log
    })

    this.size = this.logs.length;
    this.lastLogTime = this.logs.at(-1)?.timestamp || undefined;
  }

  head(length: number = 5): Log[] {
    return this.logs.slice(0, length);
  }

  tail(length: number = 5): Log[] {
    return this.logs.slice(this.logs.length - length);
  }

  findByTimeStamp(timestamp: number) {
    return this.logs.find(log => log.timestamp === timestamp)
  }

  findByTimeRange(startTime: number, stopTime: number = 0) {
    if (startTime === 0 && stopTime === 0) return;

    if (startTime === 0) {
      return this.logs.filter(log => log.timestamp <= stopTime);
    }

    if (stopTime === 0) {
      return this.logs.filter(log => log.timestamp >= startTime);
    }

    return this.logs.filter(log => log.timestamp >= startTime && log.timestamp <= stopTime);
  }

  findByErrorLevel(level: ErrorLevel) {
    return this.logs.filter(log => log.level === level);
  }

  findByErrorMessage(message: string) {
    return this.logs.filter(log => log.message.includes(message));
  }

  findByStack(stack: string) {
    return this.logs.filter((log) => log.stack.includes(stack));
  }
}
