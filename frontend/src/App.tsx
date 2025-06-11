import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { TopBar } from './components/topbar';
import { EstacionamentoPage } from './pages/EstacionamentoPage';
import './App.css';

function DashboardPage() {
  return <div>Bem-vindo à Visão Geral!</div>;
}

function PageLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();
  let currentPageTitle = "Visão Geral";

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  switch (location.pathname) {
    case '/estacionamentos':
      currentPageTitle = "Estacionamento";
      break;
    case '/':
      currentPageTitle = "Visão Geral";
      break;
    default:
      currentPageTitle = "Página Não Encontrada";
      break;
  }
  
  const loggedUser = {
    name: "Italo Bruno",
    role: "Administrador"
  };

  return (
    <div className="app-layout">
      <Sidebar 
        userName={loggedUser.name} 
        userRole={loggedUser.role} 
        isVisible={isSidebarVisible} 
      />
      <div className="main-container">
        <TopBar title={currentPageTitle} onMenuClick={toggleSidebar} /> {/* Nome do componente corrigido e onMenuClick passado */}
        <main className="content-area">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/estacionamentos" element={<EstacionamentoPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <PageLayout />
    </Router>
  );
}

export default App;