import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Plano, PlanoStats } from '../types';
import { planosService } from '../services/api';

export const Planos: React.FC = () => {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [planoStats, setPlanoStats] = useState<PlanoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [planosResponse, statsResponse] = await Promise.all([
        planosService.getAll(),
        planosService.getStats(),
      ]);

      setPlanos(planosResponse.data);
      setPlanoStats(statsResponse.data);
    } catch (err) {
      setError('Erro ao carregar dados dos planos');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColorByPrice = (preco: number) => {
    if (preco < 100) return 'success';
    if (preco < 200) return 'warning';
    return 'error';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Planos da Academia
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Novo Plano
        </Button>
      </Box>

      {/* Loading */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Erro */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Estatísticas dos Planos */}
      {planoStats && (
        <Card sx={{ mb: 3, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Resumo Financeiro
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2">Receita Total Mensal</Typography>
                <Typography variant="h5">
                  {formatCurrency(planoStats.receitaTotal)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2">Plano Mais Popular</Typography>
                <Typography variant="h6">
                  {planoStats.planoMaisPopular.nome}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2">Total de Membros</Typography>
                <Typography variant="h6">
                  {planoStats.planos.reduce((total, plano) => total + plano.totalMembros, 0)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Lista de Planos */}
      <Grid container spacing={3}>
        {planos.map((plano) => {
          const planoStat = planoStats?.planos.find(p => p.id === plano.id);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={plano.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: planoStat?.totalMembros > 0 ? 2 : 1,
                  borderColor: planoStat?.totalMembros > 0 ? 'primary.main' : 'divider'
                }}
              >
                <CardContent>
                  {/* Cabeçalho do Plano */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      {plano.nome}
                    </Typography>
                    <Chip 
                      label={formatCurrency(plano.preco)} 
                      color={getColorByPrice(plano.preco)}
                      size="small"
                    />
                  </Box>

                  {/* Descrição */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {plano.descricao}
                  </Typography>

                  {/* Duração */}
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    📅 Duração: {plano.duracaoDias} dias
                  </Typography>

                  {/* Estatísticas do Plano */}
                  {planoStat && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Estatísticas:</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        👥 {planoStat.totalMembros} membro(s)
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        💰 {formatCurrency(planoStat.receitaMensal)}/mês
                      </Typography>
                    </Box>
                  )}

                  {/* Badge de Popularidade */}
                  {planoStat && planoStat.totalMembros > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={`${planoStat.totalMembros} membro(s)`} 
                        color="primary" 
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Mensagem quando não há planos */}
      {planos.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Nenhum plano cadastrado
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Clique em "Novo Plano" para começar
          </Typography>
        </Box>
      )}
    </Box>
  );
};