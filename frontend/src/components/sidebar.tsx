import { NavLink } from "react-router-dom";
import "./sidebar.css";

interface SidebarProps {
  userName: string;
  userRole: string;
  isVisible: boolean;
}

export function Sidebar({ userName, userRole, isVisible }: SidebarProps) {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <nav className={`sidebar ${isVisible ? "" : "hidden"}`}>
      {" "}
      {/* Aplica a classe 'hidden' com base em isVisible */}
      <div className="sidebar-header">
        <h3>ESTACIONAMENTO TOP</h3>
      </div>
      <div className="sidebar-links">
        <NavLink to="/" end className={getLinkClass}>
          VISÃO GERAL
        </NavLink>
        <NavLink to="/estacionamentos" className={getLinkClass}>
          ESTACIONAMENTO
        </NavLink>
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-name">{userName}</div>
          <div className="user-role">{userRole}</div>
        </div>
        <button className="logout-button">SAIR</button>
      </div>
    </nav>
  );
}
