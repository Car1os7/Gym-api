import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🏋️ Gym Management</h1>
      <p>Frontend React está funcionando!</p>
      <div style={{ display: 'grid', gap: '10px' }}>
        <button onClick={() => alert('Dashboard em breve!')}>Dashboard</button>
        <button onClick={() => alert('Membros em breve!')}>Membros</button>
        <button onClick={() => alert('Planos em breve!')}>Planos</button>
        <button onClick={() => alert('Treinos em breve!')}>Treinos</button>
      </div>
    </div>
  );
}

export default App;