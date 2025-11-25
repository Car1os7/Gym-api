import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip
} from '@mui/material';
import { Add, People, AttachMoney } from '@mui/icons-material';

// Mock data temporário
const mockPlanos = [
  {
    id: '1',
    nome: 'Plano Básico',
    descricao: 'Acesso à academia em horário comercial',
    preco: 89.90,
    duracao: 30,
    tipo: 'mensal' as const,
    beneficios: ['Acesso à academia', 'Avaliação física', 'App mobile'],
    status: 'ativo' as const
  },
  {
    id: '2',
    nome: 'Plano Premium',
    descricao: 'Acesso ilimitado + aulas em grupo',
    preco: 129.90,
    duracao: 30,
    tipo: 'mensal' as const,
    beneficios: ['Acesso ilimitado', 'Aulas em grupo', 'Personal trainer', 'App mobile'],
    status: 'ativo' as const
  }
];

export const Planos: React.FC = () => {
  const [planos] = useState(mockPlanos);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          📋 Planos
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Novo Plano
        </Button>
      </Box>

      {/* Cards de estatísticas */}
      <Box display="flex" gap={3} mb={4}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <People color="primary" />
              <Typography variant="h6">Total de Planos</Typography>
            </Box>
            <Typography variant="h4" color="primary">
              {planos.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <AttachMoney color="success" />
              <Typography variant="h6">Receita Mensal</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              R$ {planos.reduce((total, plano) => total + plano.preco, 0).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Lista de planos */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={3}>
        {planos.map(plano => (
          <Card key={plano.id} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {plano.nome}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {plano.descricao}
              </Typography>
              
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="primary">
                  R$ {plano.preco.toFixed(2)}
                </Typography>
                <Chip 
                  label={plano.tipo} 
                  color="primary" 
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Benefícios:
              </Typography>
              
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {plano.beneficios.map((beneficio, index) => (
                  <Typography 
                    key={index} 
                    component="li" 
                    variant="body2"
                    color="text.secondary"
                  >
                    {beneficio}
                  </Typography>
                ))}
              </Box>
              
              <Box display="flex" gap={1} mt={2}>
                <Button variant="outlined" size="small">
                  Editar
                </Button>
                <Button variant="contained" size="small">
                  Assinantes
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
