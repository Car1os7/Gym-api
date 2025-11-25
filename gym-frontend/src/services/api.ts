import type { User, Workout } from '../types';

// Mock data para academia
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Carlos Silva', 
    email: 'carlos@academia.com', 
    phone: '(11) 99999-9999',
    createdAt: '2024-01-15' 
  },
  { 
    id: '2', 
    name: 'Ana Souza', 
    email: 'ana@academia.com', 
    phone: '(11) 98888-8888',
    createdAt: '2024-02-20' 
  },
];

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino A - Peito e Tríceps',
    description: 'Treino focado em superiores',
    duration: 60,
    difficulty: 'intermediate',
    exercises: [
      { id: '1', name: 'Supino Reto', sets: 4, reps: 12, weight: 60, restTime: 60 },
      { id: '2', name: 'Crucifixo', sets: 3, reps: 15, weight: 20, restTime: 45 },
      { id: '3', name: 'Tríceps Corda', sets: 3, reps: 12, weight: 25, restTime: 45 },
    ],
    targetMuscles: ['peito', 'tríceps'],
    isActive: true
  },
  {
    id: '2',
    name: 'Treino B - Costas e Bíceps',
    description: 'Treino focado em dorsais',
    duration: 60,
    difficulty: 'intermediate',
    exercises: [
      { id: '4', name: 'Puxada Alta', sets: 4, reps: 12, weight: 50, restTime: 60 },
      { id: '5', name: 'Remada Curvada', sets: 3, reps: 12, weight: 40, restTime: 45 },
      { id: '6', name: 'Rosca Direta', sets: 3, reps: 15, weight: 15, restTime: 45 },
    ],
    targetMuscles: ['costas', 'bíceps'],
    isActive: true
  }
];

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Users
  getUsers: async (): Promise<User[]> => {
    console.log('API: getUsers called');
    await delay(1000);
    console.log('API: getUsers returning', mockUsers);
    return [...mockUsers];
  },

  getUser: async (id: string): Promise<User> => {
    await delay(500);
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('Aluno não encontrado');
    return user;
  },

  createUser: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    await delay(800);
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    return newUser;
  },

  // Workouts
  getWorkouts: async (): Promise<Workout[]> => {
    console.log('API: getWorkouts called');
    await delay(1200);
    console.log('API: getWorkouts returning', mockWorkouts);
    return [...mockWorkouts];
  },

  getWorkout: async (id: string): Promise<Workout> => {
    await delay(500);
    const workout = mockWorkouts.find(w => w.id === id);
    if (!workout) throw new Error('Treino não encontrado');
    return workout;
  },

  createWorkout: async (workoutData: Omit<Workout, 'id'>): Promise<Workout> => {
    await delay(800);
    const newWorkout: Workout = {
      ...workoutData,
      id: Math.random().toString(36).substr(2, 9),
    };
    mockWorkouts.push(newWorkout);
    return newWorkout;
  },
};
