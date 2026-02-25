import { Router } from "express";

import AdminController from "../controllers/admin.controller";
import authMiddleware from "../middleware/auth";
import requireRole from "../middleware/role";

const router = Router();

// Protegido: apenas usuários autenticados com tipo 'clinica'
router.get('/admin/summary', authMiddleware, requireRole('clinica'), (req, res) => AdminController.summary(req, res));

export default router;
