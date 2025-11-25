import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Membro } from '../types';
import { membrosService } from '../services/api';

export const Membros: React.FC = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  // Buscar membros
  const fetchMembros = async (search?: string) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (search) {
        response = await membrosService.search({ nome: search });
        setMembros(response.data.results);
      } else {
        response = await membrosService.getAll();
        setMembros(response.data);
      }
    } catch (err) {
      setError('Erro ao carregar membros');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  // Busca com debounce
  useEffect(() => {
    if (searchTerm) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        fetchMembros(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      fetchMembros();
    }
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await membrosService.delete(id);
        fetchMembros(searchTerm || undefined);
      } catch (err) {
        setError('Erro ao excluir membro');
      }
    }
  };

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Gerenciar Membros
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Novo Membro
        </Button>
      </Box>

      {/* Barra de Busca */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar membros por nome..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      {/* Loading */}
      {(loading || searchLoading) && <LinearProgress sx={{ mb: 2 }} />}

      {/* Erro */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Lista de Membros */}
      <Grid container spacing={3}>
        {membros.map((membro) => (
          <Grid item xs={12} md={6} lg={4} key={membro.id}>
            <Card>
              <CardContent>
                {/* Cabeçalho do Card */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {membro.nome}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(membro.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {/* Informações do Membro */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  📧 {membro.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  📞 {membro.telefone || 'Não informado'}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  🎂 {new Date(membro.dataNascimento).toLocaleDateString()}
                </Typography>

                {/* Plano */}
                {membro.plano && (
                  <Chip 
                    label={membro.plano.nome} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}

                {/* Treinos */}
                {membro.treinos && membro.treinos.length > 0 && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🏋️ {membro.treinos.length} treino(s) agendado(s)
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mensagem quando não há membros */}
      {membros.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            {searchTerm ? 'Nenhum membro encontrado' : 'Nenhum membro cadastrado'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {searchTerm ? 'Tente ajustar os termos da busca' : 'Clique em "Novo Membro" para começar'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};