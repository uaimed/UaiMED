import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  medico: string;
  especialidade?: string;
  data: string;
  onPress?: () => void;
}

const NextAppointmentCard: React.FC<Props> = ({ medico, especialidade, data, onPress }) => {
  const date = new Date(data);
  const dateStr = date.toLocaleDateString('pt-BR');
  const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.medico}>{medico}</Text>
        {especialidade ? <Text style={styles.especialidade}>{especialidade}</Text> : null}
        <Text style={styles.meta}>
          <Ionicons name="calendar-outline" size={14} /> {dateStr}
        </Text>
        <Text style={styles.meta}>
          <Ionicons name="time-outline" size={14} /> {timeStr}
        </Text>
        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
          <Text style={styles.detailButtonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, elevation: 1, marginBottom: 16, marginHorizontal: 4, borderWidth: 1, borderColor: '#F5F5F5' },
  cardContent: { flexDirection: 'column' },
  medico: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 6 },
  especialidade: { fontSize: 13, color: '#777', marginBottom: 12, fontWeight: '500' },
  meta: { fontSize: 13, color: '#666', marginBottom: 8 },
  detailButton: { marginTop: 14, paddingVertical: 11, paddingHorizontal: 16, backgroundColor: '#4B73B2', borderRadius: 8, alignSelf: 'flex-start' },
  detailButtonText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});

export default NextAppointmentCard;
