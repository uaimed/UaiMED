import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import ENV from "../config/env";

export function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
  logger.error("Erro não tratado", error);
  const status = error?.status || 500;
  const message = error?.message || "Erro interno do servidor";
  res.status(status).json({ error: message, status, ...(ENV.NODE_ENV === "development" ? { stack: error?.stack } : {}) });
}

export default errorHandler;
