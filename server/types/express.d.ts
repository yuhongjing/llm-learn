import { Logger } from "../helpers/logger";

declare global {
  namespace Express {
    interface LogEntry {
      message: string;
      status: string;
    }

    interface LogData {
      message: string | Record<string, unknown>;
      logID: string;
    }

    interface LoggerMethods {
      info: (message: string | Record<string, unknown>) => void;
      warn: (message: string | Record<string, unknown>) => void;
      error: (message: string | Record<string, unknown>) => void;
    }

    interface Request {
      logID?: string;
      logger: LoggerMethods;
    }
  }
}
