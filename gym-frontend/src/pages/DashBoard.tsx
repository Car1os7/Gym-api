import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { usuario } = useAuth();

  const stats = [
    { label: 'Total de Membros', value: '156', icon: '👥', color: '#1976d2' },
    { label: 'Planos Ativos', value: '3', icon: '💼', color: '#ff5722' },
    { label: 'Receita Mensal', value: 'R$ 5.397', icon: '💰', color: '#388e3c' },
    { label: 'Treinos Hoje', value: '89', icon: '🏋️', color: '#7b1fa2' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#1976d2', margin: 0 }}>📊 Dashboard</h1>
        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Bem-vindo, {usuario?.nome}!</p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
            <h2 style={{ margin: '0 0 5px 0', color: stat.color }}>{stat.value}</h2>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1976d2' }}>Atividades Recentes</h3>
        {[
          'João Silva realizou check-in - 09:30',
          'Maria Santos agendou treino - 10:15',
          'Novo membro: Pedro Oliveira - 11:00',
          'Carlos Ferreira atualizou plano - 14:20',
          'Ana Costa completou treino - 16:45'
        ].map((activity, index) => (
          <div key={index} style={{
            padding: '8px 0',
            borderBottom: index < 4 ? '1px solid #eee' : 'none',
            color: '#666'
          }}>
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};