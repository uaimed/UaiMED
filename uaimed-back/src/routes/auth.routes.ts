import { Router, Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import { signupSchemaValidated as signupSchema, signinSchema } from "../schemas/auth.schema";
import { validateBody } from "../middleware/validate";

const router = Router();

// POST /api/usuarios
router.post("/usuarios", validateBody(signupSchema), (req: Request, res: Response) => AuthController.signup(req, res));

// POST /api/sessions
router.post("/sessions", validateBody(signinSchema), (req: Request, res: Response) => AuthController.signin(req, res));

// POST /api/auth/change-password
router.post("/auth/change-password", async (req: Request, res: Response) => {
	// Delegate to AuthController.changePassword if implemented there, otherwise handle inline
	try {
		const { oldPassword, newPassword } = req.body;
		// Basic validation
		if (!oldPassword || !newPassword) return res.status(400).json({ error: "oldPassword and newPassword are required" });

		// If no auth header, return 401
		const token = req.headers.authorization?.replace("Bearer ", "");
		if (!token) return res.status(401).json({ error: "Token não fornecido" });

		const { verifyToken } = await import("../utils/jwt");
		const decoded = verifyToken(token as string) as any;
		if (!decoded) return res.status(401).json({ error: "Token inválido" });

		const { prisma } = await import("../config/database");
		const bcrypt = await import("bcryptjs");

		const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });
		if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

		const match = await bcrypt.compare(oldPassword, user.senha);
		if (!match) return res.status(400).json({ error: "Senha atual incorreta" });

		const hashed = await bcrypt.hash(newPassword, 10);
		await prisma.usuario.update({ where: { id: user.id }, data: { senha: hashed } });

		return res.json({ message: "Senha alterada com sucesso" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Erro ao alterar senha" });
	}
});

export default router;
