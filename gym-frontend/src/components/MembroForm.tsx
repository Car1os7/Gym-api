import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';

interface MembroFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export const MembroForm: React.FC<MembroFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {initialData ? 'Editar Membro' : 'Novo Membro'}
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  {...register('nome', { required: 'Nome é obrigatório' })}
                  error={!!errors.nome}
                  helperText={errors.nome?.message as string}
                />
              </Box>
              
              <Box>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register('email', { required: 'Email é obrigatório' })}
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                />
              </Box>
              
              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <TextField
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    {...register('telefone')}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    label="Data Nascimento"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('dataNascimento')}
                  />
                </Box>
              </Box>
              
              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <TextField
                    label="Altura (cm)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('altura', { valueAsNumber: true })}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    label="Peso (kg)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    {...register('peso', { valueAsNumber: true })}
                  />
                </Box>
              </Box>
              
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {initialData ? 'Atualizar Membro' : 'Cadastrar Membro'}
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
