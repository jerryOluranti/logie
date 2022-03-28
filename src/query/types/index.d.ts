
interface ILogFactory {
  size: number;
  lastLogTime: number | undefined;
  private logs: Log[];
  parse: (logBuffer: Buffer) => void;
  head: (length: number) => Log[];
  tail: (length: number) => Log[];
  findByTimeStamp: (timestamp: number) => Log | undefined;
  findByTimeRange: (startTime: number, stopTime: number) => Log[] | undefined;
  findByErrorLevel: (level: ErrorLevel) => Log[] | undefined;
  findByStack: (stack: string) => Log[] | undefined;
  findByErrorMessage: (message: string) => Log[] | undefined;
}

interface Log {
  timestamp: number;
  level: ErrorLevel;
  stack: string;
  message: string;
}
