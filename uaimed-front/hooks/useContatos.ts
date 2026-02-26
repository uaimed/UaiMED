import { useState } from 'react';
import uaiMedApi from '../api/uaiMedApi';

/**
 * Interface para dados de contato
 */
export interface ContatoData {
  medicoId: string;
  assunto: string;
  mensagem: string;
}

/**
 * Interface de resposta de contato (mapeia o retorno real do backend)
 */
export interface ContatoResponse {
  id: string;
  usuarioId: string;
  profissionalId: string;  // Backend field name
  assunto: string;
  mensagem: string;
  criado_em: string;       // Backend returns ISO string
}

/**
 * Hook para gerenciar envio de contatos
 */
export const useContatos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Envia uma mensagem de contato para um profissional
   * Mapeia os campos do frontend para os nomes esperados pelo backend
   */
  const enviarContato = async (dados: ContatoData): Promise<ContatoResponse | null> => {
    setLoading(true);
    setError(null);

    try {
        // Mapeia medicoId (frontend) para profissionalId (backend)
        const backendPayload = {
          profissionalId: dados.medicoId,
          assunto: dados.assunto,
          mensagem: dados.mensagem,
        };
        
        // Chama o backend para enviar o contato
        const res = await uaiMedApi.post<ContatoResponse>('/contatos', backendPayload);
        return res.data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Erro ao enviar contato.';
      setError(message);
      console.error('Erro em useContatos.enviarContato:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    enviarContato,
  };
};
