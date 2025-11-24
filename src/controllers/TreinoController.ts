import { Request, Response } from 'express';
import prisma from '../utils/database';
import { TreinoSchema, UpdateTreinoSchema } from '../models/schemas';

export class TreinoController {
  static async search(req: Request, res: Response) {
  try {
    const { nome, dificuldade, duracaoMin, duracaoMax } = req.query;
    
    const where: any = {};
    
    if (nome) {
      where.nome = {
        contains: nome as string
      };
    }
    
    if (dificuldade) {
      where.dificuldade = dificuldade as string;
    }
    
    if (duracaoMin || duracaoMax) {
      where.duracao = {};
      if (duracaoMin) where.duracao.gte = parseInt(duracaoMin as string);
      if (duracaoMax) where.duracao.lte = parseInt(duracaoMax as string);
    }

    const treinos = await prisma.treino.findMany({
      where,
      include: {
        membro: {
          include: {
            plano: true
          }
        }
      }
    });

    res.json({
      results: treinos,
      total: treinos.length,
      filters: { nome, dificuldade, duracaoMin, duracaoMax }
    });
  } catch (error) {
    console.error('❌ Erro na busca de treinos:', error);
    res.status(500).json({ error: 'Erro na busca de treinos' });
  }
}
  static async getAll(req: Request, res: Response) {
    try {
      const treinos = await prisma.treino.findMany({
        include: {
          membro: {
            include: {
              plano: true
            }
          }
        }
      });
      res.json(treinos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar treinos' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const treino = await prisma.treino.findUnique({
        where: { id: parseInt(id) },
        include: {
          membro: {
            include: {
              plano: true
            }
          }
        }
      });

      if (!treino) {
        return res.status(404).json({ error: 'Treino não encontrado' });
      }

      res.json(treino);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar treino' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validatedData = TreinoSchema.parse(req.body);
      
      const treino = await prisma.treino.create({
        data: validatedData,
        include: {
          membro: {
            include: {
              plano: true
            }
          }
        }
      });

      res.status(201).json(treino);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = UpdateTreinoSchema.parse(req.body);
      
      const treino = await prisma.treino.update({
        where: { id: parseInt(id) },
        data: validatedData,
        include: {
          membro: {
            include: {
              plano: true
            }
          }
        }
      });

      res.json(treino);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await prisma.treino.delete({
        where: { id: parseInt(id) }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar treino' });
    }
  }
}