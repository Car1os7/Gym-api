import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      padding={3}
    >
      <CircularProgress size={size} />
    </Box>
  );
};