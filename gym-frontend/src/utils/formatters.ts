export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('pt-BR');
};

export const getDificuldadeColor = (dificuldade: string): "success" | "warning" | "error" | "default" => {
  switch (dificuldade) {
    case 'Iniciante': return 'success';
    case 'Intermediário': return 'warning';
    case 'Avançado': return 'error';
    default: return 'default';
  }
};

export const getPlanoColor = (preco: number): "success" | "warning" | "error" => {
  if (preco < 100) return 'success';
  if (preco < 200) return 'warning';
  return 'error';
};