import { prisma } from "../config/database";
import { hashPassword } from "../utils/hash";
import logger from "../utils/logger";

async function main() {
  logger.info("Iniciando seed...");

  await prisma.pagamento.deleteMany();
  await prisma.avaliacao.deleteMany();
  await prisma.contato.deleteMany();
  await prisma.agendamento.deleteMany();
  await prisma.profissional.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.cupom.deleteMany();

  const paciente = await prisma.usuario.create({ data: { nome: "João Paciente", email: "paciente@example.com", cpf: "123.456.789-00", telefone: "(11) 99999-9999", senha: await hashPassword("senha123"), tipo: "paciente" } });

  const medicoUsuario = await prisma.usuario.create({ data: { nome: "Dr. Carlos Silva", email: "medico@example.com", cpf: "987.654.321-00", telefone: "(11) 88888-8888", senha: await hashPassword("senha123"), tipo: "medico" } });

  const profissional = await prisma.profissional.create({ data: { usuarioId: medicoUsuario.id, especialidade: "Cardiologia", crm: "123456/SP", dataFormacao: new Date("2015-06-01"), endereco: "Rua das Flores, 123", cidade: "São Paulo", estado: "SP", cep: "01234-567" } });

  await prisma.cupom.create({ data: { codigo: "UAIMED10", desconto: 10, dataExpiracao: new Date("2025-12-31"), ativo: true, usosLimite: 100 } });
  await prisma.cupom.create({ data: { codigo: "PRIMEIRACOMPRA", desconto: 20, dataExpiracao: new Date("2025-12-31"), ativo: true } });

  logger.success("Seed concluído");
  process.exit(0);
}

main().catch((err) => {
  logger.error("Erro no seed", err);
  process.exit(1);
});
