import React, { useState } from 'react';

export const Membros: React.FC = () => {
  const [busca, setBusca] = useState('');

  const membros = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', plano: 'Premium', treinos: 12 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 88888-8888', plano: 'VIP', treinos: 8 },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(11) 77777-7777', plano: 'Básico', treinos: 5 },
    { id: 4, nome: 'Ana Costa', email: 'ana@email.com', telefone: '(11) 66666-6666', plano: 'Premium', treinos: 15 },
    { id: 5, nome: 'Carlos Ferreira', email: 'carlos@email.com', telefone: '(11) 55555-5555', plano: 'VIP', treinos: 20 }
  ];

  const membrosFiltrados = membros.filter(membro =>
    membro.nome.toLowerCase().includes(busca.toLowerCase()) ||
    membro.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1976d2', margin: 0 }}>👥 Gerenciar Membros</h1>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          + Novo Membro
        </button>
      </div>

      {/* Barra de Busca */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Buscar membros por nome ou email..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Lista de Membros */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {membrosFiltrados.map(membro => (
          <div key={membro.id} style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>{membro.nome}</h3>
              <span style={{
                padding: '4px 8px',
                backgroundColor: membro.plano === 'VIP' ? '#ff5722' : '#1976d2',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {membro.plano}
              </span>
            </div>
            
            <div style={{ color: '#666', marginBottom: '10px' }}>
              <div>📧 {membro.email}</div>
              <div>📞 {membro.telefone}</div>
              <div>🏋️ {membro.treinos} treinos</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Editar
              </button>
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#ffebee',
                color: '#d32f2f',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {membrosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Nenhum membro encontrado</p>
        </div>
      )}
    </div>
  );
};