import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        tipo: string;
        iat?: number;
        exp?: number;
      };
    }
  }
}

export {};
