import { z } from "zod";

export const contatoSchema = z.object({
  profissionalId: z.string().min(1),
  assunto: z.string().min(3),
  mensagem: z.string().min(3),
});

export type ContatoInput = z.infer<typeof contatoSchema>;
