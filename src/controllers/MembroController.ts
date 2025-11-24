import { Request, Response } from 'express';
import prisma from '../utils/database';
import { MembroSchema, UpdateMembroSchema } from '../models/schemas';

export class MembroController {
// 🔍 MÉTODO NOVO - BUSCA AVANÇADA (CORRIGIDO)
static async search(req: Request, res: Response) {
  try {
    const { nome, email, telefone } = req.query;
    
    const where: any = {};
    
    if (nome) {
      where.nome = {
        contains: nome as string
      };
    }
    
    if (email) {
      where.email = {
        contains: email as string
      };
    }
    
    if (telefone) {
      where.telefone = {
        contains: telefone as string
      };
    }

    console.log('🔍 Buscando membros com filtros:', where);

    const membros = await prisma.membro.findMany({
      where,
      include: {
        plano: true,
        treinos: true
      }
    });

    console.log(`✅ Encontrados ${membros.length} membros`);

    res.json({
      results: membros,
      total: membros.length,
      filters: { nome, email, telefone }
    });
  } catch (error) {
    console.error('❌ Erro na busca de membros:', error);
    res.status(500).json({ 
      error: 'Erro na busca de membros',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
static async getStats(req: Request, res: Response) {
  try {
    const totalMembros = await prisma.membro.count();
    const totalPlanos = await prisma.plano.count();
    const totalTreinos = await prisma.treino.count();
    
    // Membro com mais treinos
    const membroMaisAtivo = await prisma.membro.findFirst({
      include: {
        treinos: true,
        plano: true
      },
      orderBy: {
        treinos: {
          _count: 'desc'
        }
      }
    });

    res.json({
      totalMembros,
      totalPlanos,
      totalTreinos,
      membroMaisAtivo: membroMaisAtivo ? {
        id: membroMaisAtivo.id,
        nome: membroMaisAtivo.nome,
        totalTreinos: membroMaisAtivo.treinos.length,
        plano: membroMaisAtivo.plano.nome
      } : null
    });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}
  static async getAll(req: Request, res: Response) {
    try {
      const membros = await prisma.membro.findMany({
        include: {
          plano: true,
          treinos: true
        }
      });
      res.json(membros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar membros' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const membro = await prisma.membro.findUnique({
        where: { id: parseInt(id) },
        include: {
          plano: true,
          treinos: true
        }
      });

      if (!membro) {
        return res.status(404).json({ error: 'Membro não encontrado' });
      }

      res.json(membro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar membro' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validatedData = MembroSchema.parse(req.body);
      
      const membro = await prisma.membro.create({
        data: {
          ...validatedData,
          dataNascimento: new Date(validatedData.dataNascimento)
        },
        include: {
          plano: true
        }
      });

      res.status(201).json(membro);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = UpdateMembroSchema.parse(req.body);
      
      const data: any = { ...validatedData };
      if (validatedData.dataNascimento) {
        data.dataNascimento = new Date(validatedData.dataNascimento);
      }

      const membro = await prisma.membro.update({
        where: { id: parseInt(id) },
        data,
        include: {
          plano: true
        }
      });

      res.json(membro);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos', details: error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await prisma.membro.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar membro' });
    }
  }
}
