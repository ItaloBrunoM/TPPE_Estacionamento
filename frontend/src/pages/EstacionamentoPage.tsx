import { useState, useEffect } from "react";
import api from "../components/api";

// Componentes de UI
import { EstacionamentoList } from "../components/EstacionamentoList";
import { EstacionamentoForm } from "../components/EstacionamentoForm";
import { EstacionamentoEditForm } from "../components/EstacionamentoEditForm";

// Modais de Feedback
import { ConfirmModal } from "../components/ConfirmModal";
import ModalAtualiza from "../components/ModalAtualiza";


// A interface continua a mesma
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
  // --- ESTADOS PRINCIPAIS ---
  const [loading, setLoading] = useState(true);
  const [estacionamentos, setEstacionamentos] = useState<EstacionamentoType[]>([]);
  
  // --- ESTADOS DE CONTROLE DOS MODAIS ---
  // Modal de Criação
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Modal de Edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [estacionamentoToEdit, setEstacionamentoToEdit] = useState<EstacionamentoType | null>(null);

  // Modal de Confirmação de Exclusão (Lógica agora centralizada aqui!)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [estacionamentoToDelete, setEstacionamentoToDelete] = useState<EstacionamentoType | null>(null);

  // Modal de Notificação de Sucesso (o nosso ModalAtualiza!)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- FUNÇÕES DE DADOS ---
  const fetchEstacionamentos = async () => {
    // A busca inicial de dados continua a mesma
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

  // Busca os dados quando o componente é montado
  useEffect(() => {
    fetchEstacionamentos();
  }, []);

  // --- FUNÇÕES DE CALLBACK (Ações do Usuário) ---

  // Função genérica para exibir o modal de sucesso e escondê-lo após 5s
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  // Ação: Sucesso na CRIAÇÃO
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false); // Fecha o modal de criação
    fetchEstacionamentos();
    showSuccessMessage("Novo estacionamento criado com sucesso!");
  };

  // Ação: Sucesso na EDIÇÃO
  const handleEditSuccess = (nome: string) => {
    setIsEditModalOpen(false); // Fecha o modal de edição
    setEstacionamentoToEdit(null);
    fetchEstacionamentos();
    showSuccessMessage(`Estacionamento "${nome}" atualizado com sucesso!`);
  };

  // Ação: Usuário clicou no ícone de lixeira na lista
  const handleDeleteRequest = (estacionamento: EstacionamentoType) => {
    setEstacionamentoToDelete(estacionamento);
    setIsConfirmModalOpen(true); // Abre o modal de confirmação
  };

  // Ação: Usuário confirmou a exclusão no modal de confirmação
  const handleConfirmDelete = async () => {
    if (estacionamentoToDelete) {
      try {
        await api.delete(`/estacionamentos/${estacionamentoToDelete.id}`);
        fetchEstacionamentos();
        showSuccessMessage(`Estacionamento "${estacionamentoToDelete.nome}" foi excluído.`);
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

  // --- RENDERIZAÇÃO ---
  return (
    <div className="container-estacionamento">
      {/* 1. Componente de Lista, agora mais "burro", apenas emitindo eventos */}
      <EstacionamentoList
        estacionamentos={estacionamentos}
        onAddClick={() => setIsCreateModalOpen(true)}
        onEditClick={(est) => {
          setEstacionamentoToEdit(est);
          setIsEditModalOpen(true);
        }}
        onDeleteItemClick={handleDeleteRequest}
      />

      {/* 2. Modal de Criação, que chama seu callback específico de sucesso */}
      {isCreateModalOpen && (
        <EstacionamentoForm
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* 3. Modal de Edição, que chama seu callback específico de sucesso */}
      {isEditModalOpen && estacionamentoToEdit && (
        <EstacionamentoEditForm
          estacionamento={estacionamentoToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* 4. Modal de Confirmação de Exclusão, controlado pela página */}
      {isConfirmModalOpen && estacionamentoToDelete && (
        <ConfirmModal
          message={`Tem certeza que deseja excluir o estacionamento "${estacionamentoToDelete.nome}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
      
      {/* 5. Modal de Notificação de Sucesso, controlado pela página */}
      {successMessage && (
        <ModalAtualiza
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
}