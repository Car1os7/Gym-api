import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Dialog,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { MembroForm } from '../components/MembroForm';
import { memberService } from '../services/api';
import type { Membro } from '../types';

export const Membros: React.FC = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editingMembro, setEditingMembro] = useState<Membro | null>(null);

  const loadMembros = async () => {
    try {
      setLoading(true);
      const response = await memberService.getAll();
      if (response.success && response.data) {
        setMembros(response.data);
      } else {
        setError(response.error || 'Erro ao carregar membros');
      }
    } catch (err: any) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembros();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este membro?')) {
      return;
    }

    try {
      const response = await memberService.delete(id);
      if (response.success) {
        setMembros(membros.filter(m => m.id !== id));
      } else {
        alert(response.error || 'Erro ao excluir membro');
      }
    } catch (err) {
      alert('Erro ao excluir membro');
    }
  };

  const handleEdit = (membro: Membro) => {
    setEditingMembro(membro);
    setOpenForm(true);
  };

  const handleFormSuccess = () => {
    setOpenForm(false);
    setEditingMembro(null);
    loadMembros();
  };

  const handleFormCancel = () => {
    setOpenForm(false);
    setEditingMembro(null);
  };

  const membrosFiltrados = membros.filter(membro =>
    membro.nome.toLowerCase().includes(busca.toLowerCase()) ||
    membro.email.toLowerCase().includes(busca.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" color="primary">
          ?? Gerenciar Membros
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Novo Membro
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="?? Buscar membros por nome ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : membrosFiltrados.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              {busca ? 'Nenhum membro encontrado' : 'Nenhum membro cadastrado'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={2}>
          {membrosFiltrados.map((membro) => (
            <Card key={membro.id}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h6" component="h3">
                      {membro.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {membro.email}
                    </Typography>
                  </Box>
                  <Chip
                    label={membro.status}
                    color={membro.status === 'ativo' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>

                <Box mb={2}>
                  <Typography variant="body2">
                    <strong>?? Telefone:</strong> {membro.telefone || 'Não informado'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>?? Data Nascimento:</strong> {formatDate(membro.dataNascimento)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>?? Início:</strong> {formatDate(membro.dataInicio)}
                  </Typography>
                  {membro.altura && (
                    <Typography variant="body2">
                      <strong>?? Altura:</strong> {membro.altura}cm
                    </Typography>
                  )}
                  {membro.peso && (
                    <Typography variant="body2">
                      <strong>?? Peso:</strong> {membro.peso}kg
                    </Typography>
                  )}
                </Box>

                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(membro)}
                  >
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
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Dialog
        open={openForm}
        onClose={handleFormCancel}
        maxWidth="md"
        fullWidth
      >
        <MembroForm
          initialData={editingMembro}
          onSubmitSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </Dialog>
    </Box>
  );
};
