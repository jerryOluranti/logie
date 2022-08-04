

// logger types

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
  findByErrorLevel: (level: LogLevel) => IQueryFactory;
  findByOrigin: (origin: string) => IQueryFactory;
  findByErrorMessage: (message: string) => IQueryFactory;
}

export interface Log {
  timestamp: number;
  level: LogLevel;
  origin: string;
  message: string;
}

export declare type LogLevel = "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "FATAL" | "CRITICAL";


/**
 * Logs a message to the console and log file if `level` is specified
 * @param {string} message text to be logged
 * @param {LogLevel} level optional -  "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "FATAL" | "CRITICAL"
 * @returns {void}
 */
export declare function log(message: string, level: LogLevel): void;



// catch functiion type declarations

/**
 * Applies try catch to an async function
 * @param {Promise<T>} resolve promise
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {Promise<T | undefined>} Promise<T | undefined>
 */
export declare function catchAsync<T>(resolve: Promise<T>, cb?: any, _throw?: boolean): Promise<T | undefined>;

/**
 * Applies try catch to an async function
 * @param {Promise<T>} resolve promise
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {void} void
 */
export declare function catchAsyncNoReturn<T>(resolve: Promise<T>, cb?: any, _throw?: boolean): void;


/**
 * Applies try catch to a sync function
 * @param {T} result function
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {T | undefined} T | undefined
 */
export declare function catchSync<T>(result: T, cb?: any, _throw?: boolean): T | undefined;


/**
 * Applies try catch to a sync function
 * @param {any} result function
 * @param {Function} cb Optional - callback function to be triggered on error
 * @param {boolean} [_throw] Optional - specifies whether an error is thrown. default => false
 * @returns {void} void
 */
export declare function catchSyncNoReturn(result: any, cb?: any, _throw?: boolean): void;