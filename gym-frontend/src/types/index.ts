export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
  createdAt: string;
}

export interface Membro {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  altura?: number;
  peso?: number;
  dataInicio: string;
  planoId?: string;
  status: 'ativo' | 'inativo';
}

export interface Plano {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number; // em dias
  tipo: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  beneficios: string[];
  status: 'ativo' | 'inativo';
}

export interface Treino {
  id: string;
  nome: string;
  descricao: string;
  duracao: number; // em minutos
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  exercicios: Exercicio[];
  gruposMusculares: string[];
  status: 'ativo' | 'inativo';
}

export interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: number;
  peso?: number;
  tempoDescanso: number;
  observacoes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  targetMuscles: string[];
  isActive: boolean;
}

export interface Stats {
  totalMembros: number;
  membrosAtivos: number;
  totalPlanos: number;
  receitaMensal: number;
  taxaRenovacao: number;
}

export interface PlanoStats {
  planoId: string;
  planoNome: string;
  totalMembros: number;
  receitaTotal: number;
}

export interface WorkoutAssignment {
  id: string;
  userId: string;
  workoutId: string;
  startDate: string;
  endDate: string;
  notes?: string;
  user?: User;
  workout?: Workout;
}

export interface PhysicalAssessment {
  id: string;
  userId: string;
  assessmentDate: string;
  weight: number;
  height: number;
  bodyFat?: number;
  muscleMass?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  notes?: string;
  user?: User;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: 'cash' | 'credit_card' | 'debit_card' | 'pix';
  user?: User;
}

export interface GroupClass {
  id: string;
  name: string;
  description?: string;
  instructor: string;
  date: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  participants: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
