import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const usuariosDemo = [
    { email: 'admin@academia.com', senha: 'admin123', tipo: 'Administrador' },
    { email: 'secretario@academia.com', senha: 'secretario123', tipo: 'Secretário' },
    { email: 'instrutor@academia.com', senha: 'instrutor123', tipo: 'Instrutor' },
    { email: 'aluno@academia.com', senha: 'aluno123', tipo: 'Aluno' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, senha);
      navigate('/');
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  const preencherDemo = (demoEmail: string, demoSenha: string) => {
    setEmail(demoEmail);
    setSenha(demoSenha);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '440px',
        position: 'relative'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '10px'
          }}>🏋️</div>
          <h1 style={{ 
            color: '#1976d2', 
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            Gym Management
          </h1>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '16px'
          }}>
            Sistema Completo de Academia
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1976d2'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1976d2'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1565c0')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1976d2')}
          >
            {loading ? (
              <span>🔐 Entrando...</span>
            ) : (
              <span>🚀 Entrar no Sistema</span>
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h4 style={{ 
            margin: '0 0 15px 0',
            color: '#333',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            👥 Contas de Demonstração
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {usuariosDemo.map((user, index) => (
              <button
                key={index}
                type="button"
                onClick={() => preencherDemo(user.email, user.senha)}
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#1976d2'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              >
                <div style={{ fontWeight: '500', color: '#1976d2' }}>{user.tipo}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {user.email} / {user.senha}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;