import styles from 'ansi-styles';
import { LogLevel } from "@types";

export function getBgPaint(level: LogLevel) {
  switch(level) {
    case "LOG":
      return compose(styles.bgColor.bgGray);
    case "INFO":
      return compose(styles.bgColor.bgGreenBright);
    case "DEBUG":
      return compose(styles.bgColor.bgCyan);
    case "WARN":
      return compose(styles.bgColor.bgYellow);
    case "ERROR":
      return compose(styles.bgColor.bgRedBright);
    case "CRITICAL":
      return compose(styles.bgColor.bgRed);
    case "FATAL":
      return compose(styles.bgColor.bgRed);
    default:
      return compose(styles.bgColor.bgGray);
  }
}

export function getPaint(level: LogLevel) {
  switch(level) {
    case "LOG":
      return (_: string) => _;
    case "INFO":
      return compose(styles.color.greenBright);
    case "DEBUG":
      return compose(styles.color.cyan);
    case "WARN":
      return compose(styles.color.yellow);
    case "ERROR":
      return compose(styles.color.redBright);
    case "CRITICAL":
      return compose(styles.color.red);
    case "FATAL":
      return compose(styles.color.red);
    default:
      return (_: string) => _
  }
}

function compose(color: any) {
  return (str: string) => `${color.open}${str}${color.close}`
}