import { useState } from 'react';
import axios from 'axios';

export function CadastroCarro() {
  const [form, setForm] = useState({
    placa: '',
    modelo: '',
    cor: '',
    vaga_id: ''
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/carros', {
        placa: form.placa,
        modelo: form.modelo,
        cor: form.cor || null,
        vaga_id: Number(form.vaga_id)
      });
      
      setMensagem(`Carro ${response.data.placa} cadastrado na vaga ${response.data.vaga_id}!`);
      setForm({ placa: '', modelo: '', cor: '', vaga_id: '' });
    
    } catch (error) {
      let errorMessage: string;
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail 
          || error.response?.data?.message
          || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
    
      setMensagem(`Erro: ${errorMessage}`);
    }
  }; 

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Cadastrar Carro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="placa"
          value={form.placa}
          onChange={handleChange}
          placeholder="Placa (ex: ABC1D23)"
          required
          pattern="[A-Za-z]{3}\d[A-Za-z]\d{2}"
        />
        <input
          type="text"
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          placeholder="Modelo do carro"
          required
        />
        <input
          type="text"
          name="cor"
          value={form.cor}
          onChange={handleChange}
          placeholder="Cor (opcional)"
        />
        <input
          type="number"
          name="vaga_id"
          value={form.vaga_id}
          onChange={handleChange}
          placeholder="Número da vaga"
          required
          min="1"
        />
        <button type="submit">Cadastrar</button>
      </form>
      
      {mensagem && (
        <div className={`mensagem ${mensagem.includes('Erro') ? 'mensagem-erro' : 'mensagem-sucesso'}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
}
