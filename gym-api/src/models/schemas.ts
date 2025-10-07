import { z } from 'zod';

export const PlanoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("Preço deve ser positivo"),
  duracaoDias: z.number().int().positive("Duração deve ser positiva")
});

export const MembroSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  dataNascimento: z.string().datetime("Data de nascimento inválida"),
  planoId: z.number().int().positive("PlanoId deve ser positivo")
});

export const TreinoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  duracao: z.number().int().positive("Duração deve ser positiva"),
  dificuldade: z.enum(["Iniciante", "Intermediário", "Avançado"]),
  membroId: z.number().int().positive("MembroId deve ser positivo")
});

export const UpdatePlanoSchema = PlanoSchema.partial();
export const UpdateMembroSchema = MembroSchema.partial();
export const UpdateTreinoSchema = TreinoSchema.partial();

export type PlanoData = z.infer<typeof PlanoSchema>;
export type MembroData = z.infer<typeof MembroSchema>;
export type TreinoData = z.infer<typeof TreinoSchema>;