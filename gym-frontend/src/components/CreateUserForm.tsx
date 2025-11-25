import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { userSchema, UserFormData } from '../schemas';
import { LoadingSpinner } from './LoadingSpinner';

export const CreateUserForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phone: '',
    }
  });
  
  const createUserWithData = (userData: UserFormData) => api.createUser(userData);
  
  const { execute, loading, error, data: newUser } = useApi(
    createUserWithData,
    {
      immediate: false,
      onSuccess: () => {
        console.log('Aluno criado com sucesso!');
        reset();
      },
      onError: (err) => {
        console.error('Erro ao criar aluno:', err);
      }
    }
  );

  const onSubmit = (data: UserFormData) => {
    execute(data);
  };

  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            ➕ Novo Aluno
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Nome Completo *"
                variant="outlined"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                disabled={loading}
              />
              
              <TextField
                label="Telefone"
                variant="outlined"
                fullWidth
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={loading}
                placeholder="(11) 99999-9999"
              />
              
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loading}
              />
              
              <TextField
                label="Data de Nascimento"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('birthDate')}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
                disabled={loading}
              />
              
              <TextField
                label="Altura (cm)"
                type="number"
                variant="outlined"
                fullWidth
                {...register('height', { valueAsNumber: true })}
                error={!!errors.height}
                helperText={errors.height?.message}
                disabled={loading}
              />
              
              <TextField
                label="Peso (kg)"
                type="number"
                variant="outlined"
                fullWidth
                {...register('weight', { valueAsNumber: true })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                disabled={loading}
              />

              {error && (
                <Alert severity="error">
                  Erro: {error.message}
                </Alert>
              )}
              
              {newUser && (
                <Alert severity="success">
                  ✅ Aluno criado com sucesso! ID: {newUser.id}
                </Alert>
              )}
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <LoadingSpinner size={24} /> : 'Cadastrar Aluno'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
