import { Request, Response } from 'express';
import prisma from '../utils/database';
import { PlanoSchema, UpdatePlanoSchema } from '../models/schemas';

export class PlanoController {
  // 📊 MÉTODO NOVO - ESTATÍSTICAS DOS PLANOS
static async getStats(req: Request, res: Response) {
  try {
    const planos = await prisma.plano.findMany({
      include: {
        membros: true
      }
    });

    const stats = planos.map(plano => ({
      id: plano.id,
      nome: plano.nome,
      preco: plano.preco,
      totalMembros: plano.membros.length,
      receitaMensal: plano.preco * plano.membros.length
    }));

    const receitaTotal = stats.reduce((total, plano) => total + plano.receitaMensal, 0);

    res.json({
      planos: stats,
      receitaTotal,
      planoMaisPopular: stats.reduce((prev, current) => 
        (prev.totalMembros > current.totalMembros) ? prev : current
      )
    });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas dos planos:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}
  static async getAll(req: Request, res: Response) {
    try {
      const planos = await prisma.plano.findMany();
      res.json(planos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar planos' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const plano = await prisma.plano.findUnique({
        where: { id: parseInt(id) }
      });

      if (!plano) {
        return res.status(404).json({ error: 'Plano não encontrado' });
      }

      res.json(plano);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar plano' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validatedData = PlanoSchema.parse(req.body);
      
      const plano = await prisma.plano.create({
        data: validatedData
      });

      res.status(201).json(plano);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = UpdatePlanoSchema.parse(req.body);
      
      const plano = await prisma.plano.update({
        where: { id: parseInt(id) },
        data: validatedData
      });

      res.json(plano);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await prisma.plano.delete({
        where: { id: parseInt(id) }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar plano' });
    }
  }
}