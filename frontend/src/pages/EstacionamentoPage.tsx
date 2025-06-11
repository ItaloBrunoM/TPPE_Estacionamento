// src/pages/EstacionamentoPage.tsx
import { useState, useEffect } from "react";
import api from "../components/api";
import { EstacionamentoList } from "../components/EstacionamentoList";
import { EstacionamentoForm } from "../components/EstacionamentoForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSuccess = () => {
    handleCloseModal();
    fetchEstacionamentos();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-estacionamento">
      <EstacionamentoList
        estacionamentos={estacionamentos}
        onAddClick={handleOpenModal}
        onDeleteSuccess={fetchEstacionamentos}
      />

      {isModalOpen && (
        <EstacionamentoForm
          onClose={handleCloseModal}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}