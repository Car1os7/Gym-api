import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { PlanoStats, Stats } from '../types';

interface ChartsProps {
  stats?: Stats;
  planoStats?: PlanoStats;
}

export const Charts: React.FC<ChartsProps> = () => {
  // Dados mockados temporariamente
  const planosData = [
    { name: 'Plano Básico', membros: 25 },
    { name: 'Plano Premium', membros: 15 },
    { name: 'Plano VIP', membros: 8 }
  ];

  const receitaData = [
    { name: 'Plano Básico', receita: 2500 },
    { name: 'Plano Premium', receita: 3000 },
    { name: 'Plano VIP', receita: 4000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ width: '100%', height: 400, display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <h3>Membros por Plano</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={planosData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="membros" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ flex: 1 }}>
        <h3>Receita por Plano</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={receitaData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="receita"
            >
              {receitaData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
