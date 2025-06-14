import { useState } from 'react';
import { EstacionamentoType } from "../pages/EstacionamentoPage";
import "./EstacionamentoList.css";
import { ConfirmModal } from './ConfirmModal';
import api from '../components/api';

interface EstacionamentoListProps {
  estacionamentos: EstacionamentoType[];
  onAddClick: () => void;
  onDeleteSuccess: () => void;
  onEditClick: (estacionamento: EstacionamentoType) => void;
}

export function EstacionamentoList({
  estacionamentos,
  onAddClick,
  onDeleteSuccess,
  onEditClick,
}: EstacionamentoListProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [estacionamentoToDeleteId, setEstacionamentoToDeleteId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setEstacionamentoToDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (estacionamentoToDeleteId !== null) {
      try {
        await api.delete(`/estacionamentos/${estacionamentoToDeleteId}/`);
        alert('Estacionamento deletado com sucesso!');
        onDeleteSuccess();
      } catch (error) {
        console.error('Erro ao deletar estacionamento:', error);
        alert('Erro ao deletar estacionamento. Tente novamente.');
      } finally {
        setShowConfirmModal(false);
        setEstacionamentoToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setEstacionamentoToDeleteId(null);
  };

  return (
    <>
      <div
        className="header-actions"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
      >
        <input type="search" placeholder="Buscar Estacionamento" />
        <button onClick={onAddClick} 
          style={{ cursor: "pointer" }}
        >
          + CRIAR ESTACIONAMENTO
        </button>
      </div>

      <div className="list-container">
        {estacionamentos.map((est) => (
          <div
            key={est.id}
            className="list-item"
            style={{ display: "flex", justifyContent: "space-between", padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}
          >
            <span className="item-name">{est.nome}</span>
            <div className="item-actions">
              <button className="icon-btn" onClick={() => onEditClick(est)}>✏️</button>
              <button className="icon-btn" onClick={() => handleDeleteClick(est.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmModal && (
        <ConfirmModal
          message={`Tem certeza que deseja deletar o estacionamento com ID ${estacionamentoToDeleteId}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}