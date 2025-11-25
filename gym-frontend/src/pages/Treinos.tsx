import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip
} from '@mui/material';
import { Add, FitnessCenter, Schedule } from '@mui/icons-material';

// Mock data temporário
const mockTreinos = [
  {
    id: '1',
    nome: 'Treino A - Peito e Tríceps',
    descricao: 'Treino focado em superiores',
    duracao: 60,
    dificuldade: 'intermediario' as const,
    exercicios: [
      { nome: 'Supino Reto', series: 4, repeticoes: 12 },
      { nome: 'Crucifixo', series: 3, repeticoes: 15 },
      { nome: 'Tríceps Corda', series: 3, repeticoes: 12 }
    ],
    gruposMusculares: ['peito', 'tríceps'],
    status: 'ativo' as const
  }
];

export const Treinos: React.FC = () => {
  const [treinos] = useState(mockTreinos);

  const getDifficultyColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'iniciante': return 'success';
      case 'intermediario': return 'warning';
      case 'avancado': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          💪 Treinos
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Novo Treino
        </Button>
      </Box>

      {/* Lista de treinos */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={3}>
        {treinos.map(treino => (
          <Card key={treino.id} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {treino.nome}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {treino.descricao}
              </Typography>
              
              <Box display="flex" gap={1} mb={2}>
                <Chip 
                  icon={<Schedule />}
                  label={`${treino.duracao} min`}
                  size="small"
                  variant="outlined"
                />
                <Chip 
                  label={treino.dificuldade}
                  color={getDifficultyColor(treino.dificuldade) as any}
                  size="small"
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Exercícios:
              </Typography>
              
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {treino.exercicios.slice(0, 3).map((exercicio, index) => (
                  <Typography 
                    key={index} 
                    component="li" 
                    variant="body2"
                    color="text.secondary"
                  >
                    {exercicio.nome} - {exercicio.series}x{exercicio.repeticoes}
                  </Typography>
                ))}
                {treino.exercicios.length > 3 && (
                  <Typography component="li" variant="body2" color="text.secondary">
                    ... mais {treino.exercicios.length - 3} exercícios
                  </Typography>
                )}
              </Box>
              
              <Box display="flex" gap={1} mt={2}>
                <Button variant="outlined" size="small">
                  Editar
                </Button>
                <Button variant="contained" size="small" startIcon={<FitnessCenter />}>
                  Executar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
