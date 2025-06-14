import "./topbar.css";

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button className="menu-button" onClick={onMenuClick}>
          ☰
        </button>{" "}
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="top-bar-right">
        <div className="user-profile">
          <span className="user-icon">👤</span>
          <button className="login-button">Entrar</button>
        </div>
      </div>
    </header>
  );
}
