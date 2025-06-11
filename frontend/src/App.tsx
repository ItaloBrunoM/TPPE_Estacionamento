import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EstacionamentoPage } from './pages/EstacionamentoPage';
import { Sidebar } from './components/sidebar.tsx';
import './App.css';

function Dashboard() {
  return (
    <div>
      <h1>Visão Geral</h1>
      <p>Dashboard em construção. Selecione um estacionamento.</p>
      <div className="card" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
        <h3>Vagas Ocupadas</h3>
        <p>50/50</p>
      </div>
    </div>
  );
}

function App() {
  const loggedUser = {
    name: "Italo Bruno",
    role: "Administrador"
  };

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        {/* 3. Substituímos a <nav> antiga pelo componente <Sidebar> */}
        <Sidebar userName={loggedUser.name} userRole={loggedUser.role} />
        <main className="main-content" style={{ flex: 1, padding: '20px' }}>
          {/* O conteúdo principal e as rotas permanecem os mesmos */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estacionamentos" element={<EstacionamentoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;