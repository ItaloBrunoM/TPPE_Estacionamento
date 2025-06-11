import { NavLink } from 'react-router-dom';
import './sidebar.css';

interface SidebarProps {
  userName: string;
  userRole: string;
}

export function Sidebar({ userName, userRole }: SidebarProps) {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? 'sidebar-link active' : 'sidebar-link';

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>ESTACIONAMENTO TOP</h3>
      </div>
      <div className="sidebar-links">
        {/* Links de navegação continuam os mesmos */}
        <NavLink to="/estacionamentos" className={getLinkClass}>
          ESTACIONAMENTO
        </NavLink>
        <NavLink to="/" end className={getLinkClass}>
          VISÃO GERAL
        </NavLink>
        {/* ... outros links */}
      </div>
      <div className="sidebar-footer">
        {/* 2. Usamos as props para exibir os dados dinâmicos */}
        <div className="user-info">
          <div className="user-name">{userName}</div>
          <div className="user-role">{userRole}</div>
        </div>
        <button className="logout-button">SAIR</button>
      </div>
    </nav>
  );
}