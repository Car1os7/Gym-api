import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym API',
      version: '1.0.0',
      description: 'API para gerenciamento de academia',
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
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);