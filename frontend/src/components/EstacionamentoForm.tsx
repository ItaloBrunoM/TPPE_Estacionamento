import { useState } from "react";
import api from "./api";
import "./EstacionamentoForm.css";

interface EstacionamentoFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function EstacionamentoForm({
  onClose,
  onSuccess,
}: EstacionamentoFormProps) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [totalVagas, setTotalVagas] = useState("");
  const [valorPrimeiraHora, setValorPrimeiraHora] = useState("");
  const [valorDemaisHoras, setValorDemaisHoras] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      valor_primeira_hora: parseFloat(valorPrimeiraHora) || null,
      valor_demais_horas: parseFloat(valorDemaisHoras) || null,
      valor_diaria: parseFloat(valorDiaria) || null,
    };

    try {
      await api.post("/estacionamentos/", data);
      onSuccess();
    } catch (err) {
      setError("Erro ao criar o estacionamento. Tente novamente.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Estacionamento</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome do Estacionamento</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: EasyPark"
          />

          <label>Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Ex: AV. 123, numero 23"
          />

          <label>Capacidade</label>
          <input
            type="number"
            value={totalVagas}
            onChange={(e) => setTotalVagas(e.target.value)}
            placeholder="Ex: 123"
          />

          <label>Valor por Primeira Hora (R$)</label>
          <input
            type="number"
            step="0.01"
            value={valorPrimeiraHora}
            onChange={(e) => setValorPrimeiraHora(e.target.value)}
            placeholder="Ex: 15.00"
          />

          <label>Valor por Demais Horas (R$)</label>
          <input
            type="number"
            step="0.01"
            value={valorDemaisHoras}
            onChange={(e) => setValorDemaisHoras(e.target.value)}
            placeholder="Ex: 5.00"
          />

          <label>Valor da Diária (R$)</label>
          <input
            type="number"
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
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
