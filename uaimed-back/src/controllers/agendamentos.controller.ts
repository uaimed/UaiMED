import { Request, Response } from "express";
import { prisma } from "../config/database";

class AgendamentosController {
  async listar(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      // se não autenticado, retorna lista pública simulada
      if (!userId) {
        const simulated = [
          { id: '1', medico: 'Dr. Lucas Ribeiro', especialidade: 'Cardiologia', data: new Date().toISOString(), status: 'confirmado' }
        ];
        return res.json(simulated);
      }

      const agendamentos = await prisma.agendamento.findMany({
        where: { usuarioId: userId },
        include: { profissional: { include: { usuario: true } } },
        orderBy: { dataHora: 'desc' },
      });

      const mapped = agendamentos.map(a => ({
        id: a.id,
        medico: a.profissional?.usuario?.nome || null,
        especialidade: a.profissional?.especialidade || null,
        data: a.dataHora,
        status: a.status,
      }));

      return res.json(mapped);
    } catch (err) {
      console.error('Erro ao listar agendamentos', err);
      return res.status(500).json({ error: 'Erro ao listar agendamentos' });
    }
  }
}

export default new AgendamentosController();
