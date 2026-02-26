import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avaliacao } from '../types/avaliacao';

interface CardAvaliacaoProps {
  avaliacao: Avaliacao;
  onPress?: () => void;
  compact?: boolean;
}

/**
 * Card de Avaliação Reutilizável
 * Exibe resumo de uma avaliação
 */
export const CardAvaliacao: React.FC<CardAvaliacaoProps> = ({
  avaliacao,
  onPress,
  compact = false,
}) => {
  const mediaNotas =
    (avaliacao.notaAtendimento +
      avaliacao.notaPuntualidade +
      avaliacao.notaClinica +
      avaliacao.notaComuni) /
    4;

  const data = new Date(avaliacao.dataAvaliacao);
  const dataFormatada = data.toLocaleDateString('pt-BR');

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactDate}>{dataFormatada}</Text>
          <View style={styles.compactRating}>
            <Ionicons name="star" size={12} color="#FFB800" />
            <Text style={styles.compactRatingText}>{mediaNotas.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.compactComment} numberOfLines={1}>
          {avaliacao.comentario}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#4CAF50" />
          <Text style={styles.dateText}>{dataFormatada}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={styles.ratingBadgeText}>{mediaNotas.toFixed(1)}</Text>
        </View>
      </View>

      {/* Notas */}
      <View style={styles.notasRow}>
        <View style={styles.nota}>
          <Text style={styles.notaLabel}>Atend.</Text>
          <Text style={styles.notaValue}>{avaliacao.notaAtendimento}★</Text>
        </View>
        <View style={styles.nota}>
          <Text style={styles.notaLabel}>Pontual.</Text>
          <Text style={styles.notaValue}>{avaliacao.notaPuntualidade}★</Text>
        </View>
        <View style={styles.nota}>
          <Text style={styles.notaLabel}>Clínica</Text>
          <Text style={styles.notaValue}>{avaliacao.notaClinica}★</Text>
        </View>
        <View style={styles.nota}>
          <Text style={styles.notaLabel}>Comun.</Text>
          <Text style={styles.notaValue}>{avaliacao.notaComuni}★</Text>
        </View>
      </View>

      {/* Resposta Rápida */}
      <View style={styles.respostasRow}>
        <Text style={styles.respostaLabel}>
          Voltaria:{' '}
          <Text
            style={{
              color:
                avaliacao.voltariaClinica === 'sim'
                  ? '#4CAF50'
                  : avaliacao.voltariaClinica === 'nao'
                    ? '#D9534F'
                    : '#FF9800',
            }}
          >
            {avaliacao.voltariaClinica === 'sim'
              ? '✓'
              : avaliacao.voltariaClinica === 'nao'
                ? '✗'
                : '?'}
          </Text>
        </Text>
        <Text style={styles.respostaLabel}>
          Recomenda:{' '}
          <Text
            style={{
              color:
                avaliacao.recomendaMedico === 'sim'
                  ? '#4CAF50'
                  : avaliacao.recomendaMedico === 'nao'
                    ? '#D9534F'
                    : '#FF9800',
            }}
          >
            {avaliacao.recomendaMedico === 'sim'
              ? '✓'
              : avaliacao.recomendaMedico === 'nao'
                ? '✗'
                : '?'}
          </Text>
        </Text>
      </View>

      {/* Comentário */}
      {avaliacao.comentario && (
        <View style={styles.comentarioBox}>
          <Text style={styles.comentario} numberOfLines={2}>
            "{avaliacao.comentario}"
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBF0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  notasRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  nota: {
    alignItems: 'center',
  },
  notaLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  notaValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  respostasRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    marginBottom: 8,
  },
  respostaLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  comentarioBox: {
    backgroundColor: '#F0F7F0',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  comentario: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  compactCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 6,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  compactDate: {
    fontSize: 11,
    color: '#999',
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  compactRatingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  compactComment: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
