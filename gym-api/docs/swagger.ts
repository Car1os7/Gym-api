import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym API - Sistema Completo',
      version: '2.0.0',
      description: 'API completa para gerenciamento de academia com busca avançada, estatísticas e relatórios',
      contact: {
        name: 'Equipe de Desenvolvimento',
        members: [
          'Julio Balestrin',
          'Leo Stronda', 
          'Batista',
          'Sergiao',
          'Renato Cariani',
          'Carlao'
        ]
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Plano: {
          type: 'object',
          required: ['nome', 'preco', 'duracaoDias'],
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            preco: { type: 'number' },
            duracaoDias: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Membro: {
          type: 'object',
          required: ['nome', 'email', 'dataNascimento', 'planoId'],
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            telefone: { type: 'string' },
            dataNascimento: { type: 'string', format: 'date-time' },
            planoId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            plano: { $ref: '#/components/schemas/Plano' },
            treinos: { type: 'array', items: { $ref: '#/components/schemas/Treino' } }
          }
        },
        Treino: {
          type: 'object',
          required: ['nome', 'duracao', 'dificuldade', 'membroId'],
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            duracao: { type: 'integer' },
            dificuldade: { type: 'string', enum: ['Iniciante', 'Intermediário', 'Avançado'] },
            membroId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            membro: { $ref: '#/components/schemas/Membro' }
          }
        },
        // 🔍 NOVOS SCHEMAS PARA BUSCA E ESTATÍSTICAS
        BuscaMembros: {
          type: 'object',
          properties: {
            results: {
              type: 'array',
              items: { $ref: '#/components/schemas/Membro' }
            },
            total: { type: 'integer' },
            filters: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                email: { type: 'string' },
                telefone: { type: 'string' }
              }
            }
          }
        },
        BuscaTreinos: {
          type: 'object',
          properties: {
            results: {
              type: 'array',
              items: { $ref: '#/components/schemas/Treino' }
            },
            total: { type: 'integer' },
            filters: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                dificuldade: { type: 'string' },
                duracaoMin: { type: 'integer' },
                duracaoMax: { type: 'integer' }
              }
            }
          }
        },
        EstatisticasMembros: {
          type: 'object',
          properties: {
            totalMembros: { type: 'integer' },
            totalPlanos: { type: 'integer' },
            totalTreinos: { type: 'integer' },
            membroMaisAtivo: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                nome: { type: 'string' },
                totalTreinos: { type: 'integer' },
                plano: { type: 'string' }
              }
            }
          }
        },
        EstatisticasPlanos: {
          type: 'object',
          properties: {
            planos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  nome: { type: 'string' },
                  preco: { type: 'number' },
                  totalMembros: { type: 'integer' },
                  receitaMensal: { type: 'number' }
                }
              }
            },
            receitaTotal: { type: 'number' },
            planoMaisPopular: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                nome: { type: 'string' },
                preco: { type: 'number' },
                totalMembros: { type: 'integer' },
                receitaMensal: { type: 'number' }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);