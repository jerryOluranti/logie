export interface ILoggerConfig {
  logName: string,
  logPath: string,
  maxSize?: number,
  logToFile: boolean
}

export interface IQueryFactory {
  size: number;
  lastLogTime: number | undefined;
  logs: Array<Log>;
  get: () => Array<Log>;
  parse: (logBuffer: Buffer) => void;
  head: (length: number) => Array<Log>;
  tail: (length: number) => Array<Log>;
  findByTimeStamp: (timestamp: number) => Log | undefined;
  findByTimeRange: (startTime: number, stopTime: number) => IQueryFactory;
  findByErrorLevel: (level: ErrorLevel) => IQueryFactory;
  findByStack: (stack: string) => IQueryFactory;
  findByErrorMessage: (message: string) => IQueryFactory;
}

export interface Log {
  timestamp: number;
  level: ErrorLevel;
  stack: string;
  message: string;
}

export declare type ErrorLevel = "INFO" | "WARN" | "LOW" | "MODERATE" | "HIGH" | "EMERGENCY"