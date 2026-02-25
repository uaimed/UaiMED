import { Router, Request, Response } from "express";
import authMiddleware from "../middleware/auth";
import ContatosController from "../controllers/contatos.controller";
import { contatoSchema } from "../schemas/contato.schema";
import { validateBody } from "../middleware/validate";

const router = Router();

// POST /api/contatos
router.post("/contatos", authMiddleware, validateBody(contatoSchema), (req: Request, res: Response) => ContatosController.criar(req, res));

// GET /api/contatos
router.get("/contatos", authMiddleware, (req: Request, res: Response) => ContatosController.listar(req, res));

export default router;
