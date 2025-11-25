import axios from 'axios';
import type { Membro, Plano, Treino, Stats, PlanoStats } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const membrosService = {
  getAll: () => api.get('/membros'),
  getById: (id: number) => api.get(`/membros/${id}`),
  create: (data: any) => api.post('/membros', data),
  update: (id: number, data: any) => api.put(`/membros/${id}`, data),
  delete: (id: number) => api.delete(`/membros/${id}`),
  search: (filters: any) => api.get('/membros/search', { params: filters }),
  getStats: () => api.get('/membros/stats'),
};

export const planosService = {
  getAll: () => api.get('/planos'),
  getById: (id: number) => api.get(`/planos/${id}`),
  create: (data: any) => api.post('/planos', data),
  update: (id: number, data: any) => api.put(`/planos/${id}`, data),
  delete: (id: number) => api.delete(`/planos/${id}`),
  getStats: () => api.get('/planos/stats'),
};

export const treinosService = {
  getAll: () => api.get('/treinos'),
  getById: (id: number) => api.get(`/treinos/${id}`),
  create: (data: any) => api.post('/treinos', data),
  update: (id: number, data: any) => api.put(`/treinos/${id}`, data),
  delete: (id: number) => api.delete(`/treinos/${id}`),
  search: (filters: any) => api.get('/treinos/search', { params: filters }),
};