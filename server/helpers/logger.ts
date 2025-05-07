import fs from "fs";
import path from "path";
import { Request } from "express";

class Logger {
  private logFilePath: string;

  constructor() {
    const rootDir = process.cwd();
    this.logFilePath = path.join(rootDir, "./log/server.log");
  }

  private writeLog(data: Express.LogData, status: string) {
    const timestamp = new Date().toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      hour12: false,
    });
    const { message, logID } = data || {};
    const logEntry: Express.LogEntry = {
      message: typeof message === "string" ? message : JSON.stringify(message),
      status,
    };
    const logMessage = `[${timestamp} - ${logID}] ${JSON.stringify(
      logEntry
    )}\n`;
    fs.appendFileSync(this.logFilePath, logMessage, "utf8");
  }

  info(data: Express.LogData) {
    this.writeLog(data, "INFO");
  }

  warn(data: Express.LogData) {
    this.writeLog(data, "WARN");
  }

  error(data: Express.LogData) {
    this.writeLog(data, "ERROR");
  }
}

const logger = new Logger();

export { logger };
