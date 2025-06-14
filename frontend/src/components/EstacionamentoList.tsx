import { EstacionamentoType } from "../pages/EstacionamentoPage";
import "./EstacionamentoList.css";

interface EstacionamentoListProps {
  estacionamentos: EstacionamentoType[];
  onAddClick: () => void;
  onDeleteItemClick: (estacionamento: EstacionamentoType) => void;
  onEditClick: (estacionamento: EstacionamentoType) => void;
}

export function EstacionamentoList({
  estacionamentos,
  onAddClick,
  onDeleteItemClick,
  onEditClick,
}: EstacionamentoListProps) {
  return (
    <>
      <div
        className="header-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input type="search" placeholder="Buscar Estacionamento" />
        <button onClick={onAddClick} style={{ cursor: "pointer" }}>
          + CRIAR ESTACIONAMENTO
        </button>
      </div>

      <div className="list-container">
        {estacionamentos.map((est) => (
          <div
            key={est.id}
            className="list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <span className="item-name">{est.nome}</span>
            <div className="item-actions">
              <button className="icon-btn" onClick={() => onEditClick(est)}>
                ✏️
              </button>
              <button
                className="icon-btn"
                onClick={() => onDeleteItemClick(est)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
