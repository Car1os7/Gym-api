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
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
});