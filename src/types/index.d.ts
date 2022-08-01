interface ILoggerConfig {
  log_name: string,
  log_path: string,
  max_size: number,
  log_to_file: boolean
}

declare type ErrorLevel = "INFO" | "WARN" | "LOW" | "MODERATE" | "HIGH" | "EMERGENCY"