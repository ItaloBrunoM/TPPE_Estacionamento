import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EstacionamentoPage } from './pages/EstacionamentoPage';
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
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        <nav className="sidebar" style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
          <div className="sidebar-header" style={{ marginBottom: '30px' }}>ESTACIONAMENTO TOP</div>
          <Link to="/" style={{ color: 'white', display: 'block', marginBottom: '10px' }}>VISÃO GERAL</Link>
          <Link to="/estacionamentos" style={{ color: 'white', display: 'block', marginBottom: '10px' }}>ESTACIONAMENTO</Link>
        </nav>

        <main className="main-content" style={{ flex: 1, padding: '20px' }}>
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