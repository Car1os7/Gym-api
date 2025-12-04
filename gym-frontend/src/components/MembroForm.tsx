import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema, type MemberFormData } from '../schemas/member.schema';
import { memberService } from '../services/api';

interface MembroFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  initialData?: any;
}

export const MembroForm: React.FC<MembroFormProps> = ({ 
  onSubmitSuccess, 
  onCancel, 
  initialData 
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData || {
      nome: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      altura: undefined,
      peso: undefined,
      planoId: '',
    },
  });

  const onSubmit = async (data: MemberFormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      let response;
      if (initialData?.id) {
        response = await memberService.update(initialData.id, data);
      } else {
        response = await memberService.create(data);
      }

      if (response.success) {
        setSuccess(true);
        reset();
        setTimeout(() => {
          if (onSubmitSuccess) onSubmitSuccess();
        }, 1500);
      } else {
        setError(response.error || 'Erro ao salvar membro');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {initialData ? 'Editar Membro' : 'Novo Membro'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Membro salvo com sucesso!
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Nome *"
                variant="outlined"
                fullWidth
                {...register('nome')}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                disabled={loading}
              />

              <TextField
                label="Email *"
                type="email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading || !!initialData}
              />

              <TextField
                label="Telefone"
                variant="outlined"
                fullWidth
                {...register('telefone')}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
                disabled={loading}
              />

              <TextField
                label="Data de Nascimento"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('dataNascimento')}
                error={!!errors.dataNascimento}
                helperText={errors.dataNascimento?.message}
                disabled={loading}
              />

              <Box display="flex" gap={2}>
                <TextField
                  label="Altura (cm)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...register('altura')}
                  error={!!errors.altura}
                  helperText={errors.altura?.message}
                  disabled={loading}
                />
                <TextField
                  label="Peso (kg)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...register('peso')}
                  error={!!errors.peso}
                  helperText={errors.peso?.message}
                  disabled={loading}
                />
              </Box>

              <Box display="flex" gap={2} justifyContent="flex-end">
                {onCancel && (
                  <Button
                    onClick={onCancel}
                    variant="outlined"
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
