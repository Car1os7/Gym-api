export interface Plano {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoDias: number;
  createdAt: string;
  updatedAt: string;
}

export interface Membro {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  planoId: number;
  createdAt: string;
  updatedAt: string;
  plano?: Plano;
  treinos?: Treino[];
}

export interface Treino {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  membroId: number;
  createdAt: string;
  updatedAt: string;
  membro?: Membro;
}

export interface Stats {
  totalMembros: number;
  totalPlanos: number;
  totalTreinos: number;
  membroMaisAtivo: {
    id: number;
    nome: string;
    totalTreinos: number;
    plano: string;
  };
}

export interface PlanoStats {
  planos: Array<{
    id: number;
    nome: string;
    preco: number;
    totalMembros: number;
    receitaMensal: number;
  }>;
  receitaTotal: number;
  planoMaisPopular: {
    id: number;
    nome: string;
    preco: number;
    totalMembros: number;
    receitaMensal: number;
  };
}