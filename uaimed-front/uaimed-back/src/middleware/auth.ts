import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import logger from "../utils/logger";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Token inválido ou expirado" });

    req.user = decoded as any;
    logger.info(`Usuário autenticado: ${decoded.email}`);
    next();
  } catch (err) {
    logger.error("Erro na autenticação", err);
    res.status(500).json({ error: "Erro interno" });
  }
}

export default authMiddleware;
