import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Stats, PlanoStats } from '../types';
import { membrosService, planosService } from '../services/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [planoStats, setPlanoStats] = useState<PlanoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsResponse, planoStatsResponse] = await Promise.all([
          membrosService.getStats(),
          planosService.getStats(),
        ]);
        
        setStats(statsResponse.data);
        setPlanoStats(planoStatsResponse.data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard - Visão Geral
      </Typography>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" gutterBottom>
                  Total de Membros
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {stats?.totalMembros || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentIcon color="secondary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" gutterBottom>
                  Total de Planos
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {stats?.totalPlanos || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FitnessCenterIcon color="success" sx={{ mr: 1 }} />
                <Typography color="textSecondary" gutterBottom>
                  Total de Treinos
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {stats?.totalTreinos || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="warning" sx={{ mr: 1 }} />
                <Typography color="textSecondary" gutterBottom>
                  Receita Mensal
                </Typography>
              </Box>
              <Typography variant="h6" component="div">
                R$ {planoStats?.receitaTotal.toFixed(2) || '0,00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Informações Adicionais */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Membro Mais Ativo
            </Typography>
            {stats?.membroMaisAtivo ? (
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Nome:</strong> {stats.membroMaisAtivo.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Total de Treinos:</strong> {stats.membroMaisAtivo.totalTreinos}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Plano:</strong> {stats.membroMaisAtivo.plano}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Nenhum dado disponível
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Plano Mais Popular
            </Typography>
            {planoStats?.planoMaisPopular ? (
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Plano:</strong> {planoStats.planoMaisPopular.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Membros:</strong> {planoStats.planoMaisPopular.totalMembros}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Receita:</strong> R$ {planoStats.planoMaisPopular.receitaMensal.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Nenhum dado disponível
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};