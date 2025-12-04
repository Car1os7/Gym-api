import { z } from 'zod';

export const memberSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  
  telefone: z.string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .max(20, 'Telefone deve ter no máximo 20 dígitos')
    .optional(),
  
  dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use YYYY-MM-DD)')
    .optional(),
  
  altura: z.coerce.number()
    .min(100, 'Altura mínima: 100cm')
    .max(250, 'Altura máxima: 250cm')
    .optional(),
  
  peso: z.coerce.number()
    .min(30, 'Peso mínimo: 30kg')
    .max(300, 'Peso máximo: 300kg')
    .optional(),
  
  planoId: z.string().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
