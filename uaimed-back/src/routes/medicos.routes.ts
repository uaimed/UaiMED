import { Router } from "express";
import MedicosController from "../controllers/medicos.controller";

const router = Router();

// GET /api/medicos
router.get('/medicos', (req, res) => MedicosController.listar(req, res));

export default router;
