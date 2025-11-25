import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';
import { Treino } from '../types';
import { treinosService } from '../services/api';

export const Treinos: React.FC = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dificuldadeFilter, setDificuldadeFilter] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Buscar treinos
  const fetchTreinos = async (filters?: { nome?: string; dificuldade?: string }) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (filters && (filters.nome || filters.dificuldade)) {
        response = await treinosService.search(filters);
        setTreinos(response.data.results);
      } else {
        response = await treinosService.getAll();
        setTreinos(response.data);
      }
    } catch (err) {
      setError('Erro ao carregar treinos');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  // Busca com debounce
  useEffect(() => {
    const filters: any = {};
    if (searchTerm) filters.nome = searchTerm;
    if (dificuldadeFilter) filters.dificuldade = dificuldadeFilter;

    if (searchTerm || dificuldadeFilter) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        fetchTreinos(filters);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      fetchTreinos();
    }
  }, [searchTerm, dificuldadeFilter]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDificuldadeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDificuldadeFilter(event.target.value);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este treino?')) {
      try {
        await treinosService.delete(id);
        fetchTreinos();
      } catch (err) {
        setError('Erro ao excluir treino');
      }
    }
  };

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Iniciante': return 'success';
      case 'Intermediário': return 'warning';
      case 'Avançado': return 'error';
      default: return 'default';
    }
  };

  const formatDuracao = (minutos: number) => {
    return `${minutos} min`;
  };

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Gerenciar Treinos
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Novo Treino
        </Button>
      </Box>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={8} key="search">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar treinos por nome..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} key="filter">
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Filtrar por dificuldade"
            value={dificuldadeFilter}
            onChange={handleDificuldadeFilter}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Iniciante">Iniciante</MenuItem>
            <MenuItem value="Intermediário">Intermediário</MenuItem>
            <MenuItem value="Avançado">Avançado</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Loading */}
      {(loading || searchLoading) && <LinearProgress sx={{ mb: 2 }} />}

      {/* Erro */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Contador de Resultados */}
      {treinos.length > 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {treinos.length} treino(s) encontrado(s)
          {searchTerm && ` para "${searchTerm}"`}
          {dificuldadeFilter && ` com dificuldade ${dificuldadeFilter}`}
        </Typography>
      )}

      {/* Lista de Treinos */}
      <Grid container spacing={3}>
        {treinos.map((treino) => (
          <Grid item xs={12} md={6} lg={4} key={treino.id}>
            <Card>
              <CardContent>
                {/* Cabeçalho do Card */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {treino.nome}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(treino.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {/* Dificuldade */}
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={treino.dificuldade} 
                    color={getDificuldadeColor(treino.dificuldade)}
                    size="small"
                  />
                </Box>

                {/* Descrição */}
                {treino.descricao && (
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {treino.descricao}
                  </Typography>
                )}

                {/* Informações do Treino */}
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ⏱️ Duração: {formatDuracao(treino.duracao)}
                </Typography>

                {/* Informações do Membro */}
                {treino.membro && (
                  <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Membro:</strong> {treino.membro.nome}
                    </Typography>
                    {treino.membro.plano && (
                      <Typography variant="body2" color="textSecondary">
                        📋 Plano: {treino.membro.plano.nome}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mensagem quando não há treinos */}
      {treinos.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            {searchTerm || dificuldadeFilter ? 'Nenhum treino encontrado' : 'Nenhum treino cadastrado'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {searchTerm || dificuldadeFilter ? 'Tente ajustar os filtros da busca' : 'Clique em "Novo Treino" para começar'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};