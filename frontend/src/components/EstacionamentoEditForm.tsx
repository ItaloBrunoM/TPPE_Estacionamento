import { useState, useEffect } from "react";
import api from "./api";
import "./EstacionamentoForm.css";
import { EstacionamentoType } from "../pages/EstacionamentoPage";

interface EstacionamentoEditFormProps {
  onClose: () => void;
  onSuccess: (nome: string) => void;
  estacionamento: EstacionamentoType;
}

export function EstacionamentoEditForm({
  onClose,
  onSuccess,
  estacionamento,
}: EstacionamentoEditFormProps) {
  const [nome, setNome] = useState(estacionamento.nome || "");
  const [endereco, setEndereco] = useState(estacionamento.endereco || "");
  const [totalVagas, setTotalVagas] = useState(
    String(estacionamento.total_vagas || "")
  );
  const [valorPrimeiraHora, setValorPrimeiraHora] = useState(
    String(estacionamento.valor_primeira_hora || "")
  );
  const [valorDemaisHoras, setValorDemaisHoras] = useState(
    String(estacionamento.valor_demais_horas || "")
  );
  const [valorDiaria, setValorDiaria] = useState(
    String(estacionamento.valor_diaria || "")
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setNome(estacionamento.nome || "");
    setEndereco(estacionamento.endereco || "");
    setTotalVagas(String(estacionamento.total_vagas || ""));
    setValorPrimeiraHora(String(estacionamento.valor_primeira_hora || ""));
    setValorDemaisHoras(String(estacionamento.valor_demais_horas || ""));
    setValorDiaria(String(estacionamento.valor_diaria || ""));
  }, [estacionamento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!nome || !totalVagas) {
      setError("Nome e Capacidade são obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      nome,
      endereco,
      total_vagas: parseInt(totalVagas, 10),
      valor_primeira_hora: parseFloat(valorPrimeiraHora) || 0,
      valor_demais_horas: parseFloat(valorDemaisHoras) || 0,
      valor_diaria: parseFloat(valorDiaria) || 0,
    };

    try {
      await api.put(`/estacionamentos/${estacionamento.id}`, data);
      onSuccess(data.nome);
    } catch (err) {
      setError("Erro ao atualizar o estacionamento. Tente novamente.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Estacionamento</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome do Estacionamento</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: EasyPark"
            required
          />

          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Ex: AV. 123, numero 23"
          />

          <label htmlFor="total_vagas">Capacidade</label>
          <input
            type="number"
            id="total_vagas"
            value={totalVagas}
            onChange={(e) => setTotalVagas(e.target.value)}
            placeholder="Ex: 123"
            required
          />

          <label htmlFor="valor_primeira_hora">
            Valor por Primeira Hora (R$)
          </label>
          <input
            type="number"
            id="valor_primeira_hora"
            step="0.01"
            value={valorPrimeiraHora}
            onChange={(e) => setValorPrimeiraHora(e.target.value)}
            placeholder="Ex: 15.00"
          />

          <label htmlFor="valor_demais_horas">
            Valor por Demais Horas (R$)
          </label>
          <input
            type="number"
            id="valor_demais_horas"
            step="0.01"
            value={valorDemaisHoras}
            onChange={(e) => setValorDemaisHoras(e.target.value)}
            placeholder="Ex: 5.00"
          />

          <label htmlFor="valor_diaria">Valor da Diária (R$)</label>
          <input
            type="number"
            id="valor_diaria"
            step="0.01"
            value={valorDiaria}
            onChange={(e) => setValorDiaria(e.target.value)}
            placeholder="Ex: 35.00"
          />

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-salvar"
            >
              {isSubmitting ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
