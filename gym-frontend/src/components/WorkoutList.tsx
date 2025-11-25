import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { FitnessCenter, Refresh, Schedule } from '@mui/icons-material';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const WorkoutList: React.FC = () => {
  const { data: workouts, loading, error, refetch } = useApi(
    () => api.getWorkouts(),
    { 
      immediate: true
    }
  );

  console.log('WorkoutList state:', { workouts, loading, error }); // Debug

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <Box p={3}>
      <Alert 
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={refetch}>
            Tentar Novamente
          </Button>
        }
      >
        Erro ao carregar treinos: {error.message}
      </Alert>
    </Box>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          💪 Treinos Disponíveis
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={refetch}
          disabled={loading}
        >
          Atualizar
        </Button>
      </Box>
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={3}>
        {workouts?.map(workout => (
          <Card 
            key={workout.id}
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {workout.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {workout.description}
              </Typography>
              
              <Box display="flex" gap={1} mb={2}>
                <Chip 
                  icon={<Schedule />}
                  label={`${workout.duration} min`}
                  size="small"
                  variant="outlined"
                />
                <Chip 
                  label={workout.difficulty}
                  color={getDifficultyColor(workout.difficulty) as any}
                  size="small"
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Exercícios:
              </Typography>
              
              <List dense>
                {workout.exercises.slice(0, 3).map(exercise => (
                  <ListItem key={exercise.id} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={exercise.name}
                      secondary={`${exercise.sets}x${exercise.reps} ${exercise.weight ? `- ${exercise.weight}kg` : ''}`}
                    />
                  </ListItem>
                ))}
                {workout.exercises.length > 3 && (
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={`... mais ${workout.exercises.length - 3} exercícios`}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {workouts?.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <FitnessCenter sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum treino cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Crie o primeiro treino para seus alunos
          </Typography>
        </Box>
      )}
    </Box>
  );
};
