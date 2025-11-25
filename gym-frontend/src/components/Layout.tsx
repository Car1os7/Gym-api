import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const menuItems = [
    { path: '/', label: '📊 Dashboard', icon: '📊', roles: ['admin', 'secretario', 'instrutor'] },
    { path: '/membros', label: '👥 Membros', icon: '👥', roles: ['admin', 'secretario'] },
    { path: '/planos', label: '💼 Planos', icon: '💼', roles: ['admin', 'secretario'] },
    { path: '/treinos', label: '🏋️ Treinos', icon: '🏋️', roles: ['admin', 'secretario', 'instrutor', 'aluno'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const canAccess = (roles: string[]) => {
    return roles.includes(usuario?.tipo || '');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>🏋️ Gym Management</h1>
          <span style={{
            padding: '4px 12px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {usuario?.tipo}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontWeight: '500' }}>Olá, {usuario?.nome}</span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            Sair
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          backgroundColor: 'white',
          padding: '20px 0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          borderRight: '1px solid #e0e0e0'
        }}>
          <nav>
            {menuItems
              .filter(item => canAccess(item.roles))
              .map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 25px',
                    color: location.pathname === item.path ? '#1976d2' : '#555',
                    textDecoration: 'none',
                    backgroundColor: location.pathname === item.path ? '#e3f2fd' : 'transparent',
                    borderRight: location.pathname === item.path ? '4px solid #1976d2' : 'none',
                    fontWeight: location.pathname === item.path ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '15px'
                  }}
                  onMouseOver={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: '30px',
          backgroundColor: '#f8f9fa',
          overflow: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;