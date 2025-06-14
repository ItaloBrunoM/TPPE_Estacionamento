import { useState, useEffect } from "react";
import api from "../components/api";
import { EstacionamentoList } from "../components/EstacionamentoList";
import { EstacionamentoForm } from "../components/EstacionamentoForm";
import { EstacionamentoEditForm } from "../components/EstacionamentoEditForm";
import { ConfirmModal } from "../components/ConfirmModal";
import ModalAtualiza from "../components/ModalAtualiza";

export interface EstacionamentoType {
  id: number;
  nome: string;
  total_vagas: number;
  endereco?: string;
  valor_primeira_hora?: number;
  valor_demais_horas?: number;
  valor_diaria?: number;
}

export function EstacionamentoPage() {
  const [loading, setLoading] = useState(true);
  const [estacionamentos, setEstacionamentos] = useState<EstacionamentoType[]>(
    []
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [estacionamentoToEdit, setEstacionamentoToEdit] =
    useState<EstacionamentoType | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [estacionamentoToDelete, setEstacionamentoToDelete] =
    useState<EstacionamentoType | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fetchEstacionamentos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/estacionamentos/");
      setEstacionamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar estacionamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstacionamentos();
  }, []);

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    fetchEstacionamentos();
    showSuccessMessage("Novo estacionamento criado com sucesso!");
  };

  const handleEditSuccess = (nome: string) => {
    setIsEditModalOpen(false);
    setEstacionamentoToEdit(null);
    fetchEstacionamentos();
    showSuccessMessage(`Estacionamento "${nome}" atualizado com sucesso!`);
  };

  const handleDeleteRequest = (estacionamento: EstacionamentoType) => {
    setEstacionamentoToDelete(estacionamento);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (estacionamentoToDelete) {
      try {
        await api.delete(`/estacionamentos/${estacionamentoToDelete.id}`);
        fetchEstacionamentos();
        showSuccessMessage(
          `Estacionamento "${estacionamentoToDelete.nome}" foi excluído.`
        );
      } catch (error) {
        console.error("Erro ao deletar estacionamento:", error);
      } finally {
        setIsConfirmModalOpen(false);
        setEstacionamentoToDelete(null);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-estacionamento">
      <EstacionamentoList
        estacionamentos={estacionamentos}
        onAddClick={() => setIsCreateModalOpen(true)}
        onEditClick={(est) => {
          setEstacionamentoToEdit(est);
          setIsEditModalOpen(true);
        }}
        onDeleteItemClick={handleDeleteRequest}
      />
      {isCreateModalOpen && (
        <EstacionamentoForm
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {isEditModalOpen && estacionamentoToEdit && (
        <EstacionamentoEditForm
          estacionamento={estacionamentoToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {isConfirmModalOpen && estacionamentoToDelete && (
        <ConfirmModal
          message={`Tem certeza que deseja excluir o estacionamento "${estacionamentoToDelete.nome}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      {successMessage && (
        <ModalAtualiza
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
}
