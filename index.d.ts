

// logger types

export interface ILoggerConfig {
  logName: string,
  logPath: string,
  maxSize?: number,
  logToFile: boolean,
  defaultLevel?: LogLevel,
  showOrigin?: boolean,
  showStackTrace?: boolean
}

/**
 * @class This is an API for quering log files
 */
export class Query {
  node: QueryFactory;
  /**@private */
  readFileToBuffer(): Promise<void>;
}

/**
 * This is an interface for `Query.node`; It specifies all methods for quering
 */
export interface QueryFactory {
  /**
   * length of logs
   */
  size: number;
  /**
   * timestamp of creation date & time
   */
  startDate: number | undefined;
  /** timestamp of last log */
  lastLogTime: number | undefined;
  /**
   * Get all logs
   * @returns `Array<Log>`
   */
  getAll(): Array<Log>;
  /**
   * Get queried logs. Should be called on a single or chained query methods;
   * @returns `Array<Log>`
   */
  get(): Array<Log>;
  /**
   * Converts a log file buffer in the correct log format to `Array<Log>`. Note that parsing is handled internally and this method should only be called for explicit cases and with a correct log file format buffer
   * @param {Buffer} logBuffer
   * @returns {void} void
   */
  parse(logBuffer: Buffer): void;
  /**
   * Gets the first sequence of logs
   * @param {number} length optional, default: 5
   * @returns `Array<Log>`
   */
  head(length?: number): Array<Log>;
  /**
   * Gets the last sequence of logs
   * @param {number} length optional, default: 5
   * @returns `Array<Log>`
   */
  tail(length?: number): Array<Log>;
  /**
   * `chainable` Gets logs within a range of timestamps provided
   * @param {number} startTime
   * @param {number} stopTime optional
   * @returns `QueryFactory` this
   */
  findByTimeRange(startTime: number, stopTime?: number): QueryFactory;
  /**
   * `chainable` Gets logs with level provided
   * @param {LogLevel} level `LogLevel`
   * @returns `QueryFactory` this
   */
  findByLevel(level: LogLevel): QueryFactory;
  /**
   * `chainable` Gets logs with pathlike string
   * @param {string} origin
   * @returns `QueryFactory` this
   */
  findByOrigin(origin: string): QueryFactory;
  /**
   * `chainable` Gets logs with message 
   * @param {string} message 
   * @returns `QueryFactory` this
   */
  findByMessage(message: string): QueryFactory;
}

export interface Log {
  timestamp: number;
  level: LogLevel;
  origin: string;
  message: string;
}

export declare type LogLevel = "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "CRITICAL" | "FATAL";


/**
 * Logs a message to the console and log file if `level` is specified
 * @param {string} message text to be logged
 * @param {LogLevel} level optional -  "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR" | "CRITICAL" | "FATAL"
 * @returns {void} void
 */
export declare function log(message: string, level?: LogLevel): void;



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