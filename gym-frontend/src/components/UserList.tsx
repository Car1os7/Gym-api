import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip
} from '@mui/material';
import { Refresh, Email, Phone } from '@mui/icons-material';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

export const UserList: React.FC = () => {
  const { data: users, loading, error, refetch } = useApi(
    () => api.getUsers(),
    { 
      immediate: true
    }
  );

  console.log('UserList state:', { users, loading, error }); // Debug

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
        Erro ao carregar alunos: {error.message}
      </Alert>
    </Box>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          👥 Lista de Alunos
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
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
        {users?.map(user => (
          <Card 
            key={user.id}
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
                {user.name}
              </Typography>
              
              <Box display="flex" alignItems="center" mb={1}>
                <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              
              {user.phone && (
                <Box display="flex" alignItems="center" mb={2}>
                  <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                </Box>
              )}
              
              <Chip 
                label={`Cadastro: ${user.createdAt}`}
                variant="outlined"
                size="small"
                color="primary"
              />
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {users?.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum aluno cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clique em "Novo Aluno" para adicionar o primeiro aluno
          </Typography>
        </Box>
      )}
    </Box>
  );
};
