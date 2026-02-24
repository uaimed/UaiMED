import { Router } from "express";
import AgendamentosController from "../controllers/agendamentos.controller";
import authMiddleware from "../middleware/auth";

const router = Router();

// GET /api/agendamentos (protegido)
router.get('/agendamentos', authMiddleware, (req, res) => AgendamentosController.listar(req, res));

export default router;
