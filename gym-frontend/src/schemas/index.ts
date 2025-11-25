import { z } from 'zod';

// Schema para Usuário/Aluno
export const userSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  
  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone deve estar no formato (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres')
    .optional(),
  
  birthDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
    .optional(),
  
  height: z.number()
    .min(100, 'Altura mínima: 100cm')
    .max(250, 'Altura máxima: 250cm')
    .optional(),
  
  weight: z.number()
    .min(30, 'Peso mínimo: 30kg')
    .max(300, 'Peso máximo: 300kg')
    .optional(),
});

// Schema para Login
export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido'),
  
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

// Schema para Exercício
export const exerciseSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  sets: z.number()
    .int('Número de séries deve ser inteiro')
    .min(1, 'Mínimo 1 série')
    .max(20, 'Máximo 20 séries'),
  
  reps: z.number()
    .int('Número de repetições deve ser inteiro')
    .min(1, 'Mínimo 1 repetição')
    .max(100, 'Máximo 100 repetições'),
  
  weight: z.number()
    .min(0, 'Peso não pode ser negativo')
    .max(500, 'Peso máximo: 500kg')
    .optional()
    .nullable(),
  
  restTime: z.number()
    .int('Tempo de descanso deve ser inteiro')
    .min(0, 'Tempo de descanso não pode ser negativo')
    .max(600, 'Tempo máximo: 600 segundos'),
  
  notes: z.string()
    .max(500, 'Notas devem ter no máximo 500 caracteres')
    .optional()
    .nullable(),
});

// Schema para Treino
export const workoutSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  description: z.string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .nullable(),
  
  duration: z.number()
    .int('Duração deve ser inteira')
    .min(5, 'Duração mínima: 5 minutos')
    .max(240, 'Duração máxima: 240 minutos'),
  
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  
  exercises: z.array(exerciseSchema)
    .min(1, 'Treino deve ter pelo menos 1 exercício')
    .max(20, 'Treino deve ter no máximo 20 exercícios'),
  
  targetMuscles: z.array(z.string())
    .min(1, 'Selecione pelo menos 1 grupo muscular')
    .max(10, 'Máximo 10 grupos musculares'),
  
  isActive: z.boolean().default(true),
});

// Tipos inferidos dos schemas
export type UserFormData = z.infer<typeof userSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ExerciseFormData = z.infer<typeof exerciseSchema>;
export type WorkoutFormData = z.infer<typeof workoutSchema>;
