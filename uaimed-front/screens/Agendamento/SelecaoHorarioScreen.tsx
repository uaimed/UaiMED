import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AgendamentoStackParamList } from '../../navigation/types';

type Props = StackScreenProps<AgendamentoStackParamList, 'SelecaoHorario'>;

const SelecaoHorarioScreen: React.FC<Props> = ({ route, navigation }) => {
  const { medicoId } = route.params ?? { medicoId: undefined };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Horário</Text>
      <Text style={styles.paragraph}>Horários disponíveis para o médico {medicoId} seriam listados aqui.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirmacao')}>
        <Text style={styles.buttonText}>Confirmar Agendamento</Text>
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

export default SelecaoHorarioScreen;
