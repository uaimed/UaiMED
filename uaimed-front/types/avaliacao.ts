/**
 * Tipos e Interfaces para o Sistema de Avaliação
 * Define estrutura de dados para avaliações de consultas
 */

export interface ItemAvaliacao {
  id: string;
  label: string;
  descricao?: string;
}

export interface Avaliacao {
  id: string;
  agendamentoId: string;
  medicoId: string;
  pacienteId: string;
  dataAvaliacao: string;
  
  // Avaliação numérica (1-5)
  notaAtendimento: number; // Qualidade do atendimento médico
  notaPuntualidade: number; // Se o médico foi pontual
  notaClinica: number; // Infraestrutura e limpeza
  notaComuni: number; // Comunicação com paciente
  
  // Resposta múltipla escolha
  voltariaClinica: 'sim' | 'nao' | 'talvez';
  recomendaMedico: 'sim' | 'nao' | 'talvez';
  
  // Comentários
  comentario: string;
  melhorias: string; // Sugestões de melhoria
  
  // Metadados
  criadoEm: string;
  atualizadoEm: string;
}

export interface RespostaAvaliacao {
  notaAtendimento: number;
  notaPuntualidade: number;
  notaClinica: number;
  notaComuni: number;
  voltariaClinica: 'sim' | 'nao' | 'talvez';
  recomendaMedico: 'sim' | 'nao' | 'talvez';
  comentario: string;
  melhorias: string;
}

export interface EstatisticasAvaliacao {
  totalAvaliacoes: number;
  mediaAtendimento: number;
  mediaPuntualidade: number;
  mediaClinica: number;
  mediaComuni: number;
  percentualVoltaria: number;
  percentualRecomenda: number;
  avaliacoes: Avaliacao[];
}
