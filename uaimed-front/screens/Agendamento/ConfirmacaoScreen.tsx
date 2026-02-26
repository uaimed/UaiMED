import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AgendamentoStackParamList } from '../../navigation/types';

type Props = StackScreenProps<AgendamentoStackParamList, 'Confirmacao'>;

const ConfirmacaoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento Confirmado</Text>
      <Text style={styles.paragraph}>Seu agendamento foi confirmado com sucesso. Você receberá uma notificação e um e-mail com os detalhes.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Avaliacao', { agendamentoId: 'demo', medicoId: 'med-001' })}>
        <Text style={styles.buttonText}>Avaliar Consulta (Simular)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  paragraph: { fontSize: 14, color: '#333', marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '700' },
});

export default ConfirmacaoScreen;
