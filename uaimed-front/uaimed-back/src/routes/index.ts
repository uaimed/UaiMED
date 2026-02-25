import { Router } from "express";
import authRoutes from "./auth.routes";
import contatosRoutes from "./contatos.routes";
import pagamentosRoutes from "./pagamentos.routes";
import avaliacoesRoutes from "./avaliacoes.routes";
import medicosRoutes from "./medicos.routes";
import agendamentosRoutes from "./agendamentos.routes";
import usersRoutes from "./users.routes";
import adminRoutes from "./admin.routes";
import professionalsRoutes from "./professionals.routes";

const router = Router();

router.use(authRoutes);
router.use(contatosRoutes);
router.use(pagamentosRoutes);
router.use(avaliacoesRoutes);
router.use(medicosRoutes);
router.use(agendamentosRoutes);
router.use(usersRoutes);
router.use(adminRoutes);
router.use(professionalsRoutes);

export default router;
