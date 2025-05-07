import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../helpers/logger.js";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const logID = uuidv4();
  req.logID = logID;

  req.logger = {
    info: (message) => logger.info({ logID, message }),
    warn: (message) => logger.warn({ logID, message }),
    error: (message) => logger.error({ logID, message }),
  };

  next();
}
