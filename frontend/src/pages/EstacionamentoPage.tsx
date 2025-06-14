import { useState, useEffect } from "react";
import api from "../components/api";
import { EstacionamentoList } from "../components/EstacionamentoList";
import { EstacionamentoForm } from "../components/EstacionamentoForm";
import { EstacionamentoEditForm } from "../components/EstacionamentoEditForm";

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
  const [estacionamentos, setEstacionamentos] = useState<EstacionamentoType[]>(
    []
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [estacionamentoToEdit, setEstacionamentoToEdit] =
    useState<EstacionamentoType | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleOpenEditModal = (estacionamento: EstacionamentoType) => {
    setEstacionamentoToEdit(estacionamento);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEstacionamentoToEdit(null);
  };
  const handleFormSuccess = () => {
    handleCloseCreateModal();
    handleCloseEditModal();
    fetchEstacionamentos();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-estacionamento">
      <EstacionamentoList
        estacionamentos={estacionamentos}
        onAddClick={handleOpenCreateModal}
        onDeleteSuccess={fetchEstacionamentos}
        onEditClick={handleOpenEditModal}
      />

      {isCreateModalOpen && (
        <EstacionamentoForm
          onClose={handleCloseCreateModal}
          onSuccess={handleFormSuccess}
        />
      )}

      {isEditModalOpen && estacionamentoToEdit && (
        <EstacionamentoEditForm
          estacionamento={estacionamentoToEdit}
          onClose={handleCloseEditModal}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}