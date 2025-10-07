import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../docs/swagger';

import planosRoutes from './routes/planos';
import membrosRoutes from './routes/membros';
import treinosRoutes from './routes/treinos';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/planos', planosRoutes);
app.use('/api/membros', membrosRoutes);
app.use('/api/treinos', treinosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Gym API está funcionando!',
    team: ['Julio Balestrin', 'Leo Stronda', 'Batista', 'Sergiao', 'Renato Cariani', 'Carlao']
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à Gym API!',
    documentation: '/api-docs',
    endpoints: {
      planos: '/api/planos',
      membros: '/api/membros', 
      treinos: '/api/treinos'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
