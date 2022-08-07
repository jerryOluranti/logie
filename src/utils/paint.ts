import chalk from "chalk";
import { LogLevel } from "../../types";

export function getBgPaint(level: LogLevel) {
  switch(level) {
    case "LOG":
      return chalk.bgGray;
    case "INFO":
      return chalk.bgGreenBright;
    case "DEBUG":
      return chalk.bgCyan;
    case "WARN":
      return chalk.bgYellow;
    case "ERROR":
      return chalk.bgRedBright;
    case "CRITICAL":
      return chalk.bgRed;
    case "FATAL":
      return chalk.bgRed
    default:
      return chalk.bgGray
  }
}
export function getPaint(level: LogLevel) {
  switch(level) {
    case "LOG":
      return (_: string) => _;
    case "INFO":
      return chalk.greenBright;
    case "DEBUG":
      return chalk.cyan;
    case "WARN":
      return chalk.yellow;
    case "ERROR":
      return chalk.redBright;
    case "CRITICAL":
      return chalk.red;
    case "FATAL":
      return chalk.red
    default:
      return (_: string) => _
  }
}