import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type EmailEnviadoScreenProps = StackScreenProps<AuthStackParamList, 'EmailEnviado'>;

const EmailEnviadoScreen: React.FC<EmailEnviadoScreenProps> = ({ navigation, route }) => {
  const email = route.params?.email || '';

  /**
   * Função para voltar ao login
   */
  const handleGoToLogin = () => {
    // Limpa a stack e volta ao Login
    navigation.navigate('Login');
  };

  /**
   * Função para reenviar o email
   */
  const handleResendEmail = () => {
    // TODO: Implementar lógica de reenvio de email
    console.log('Reenviando email para:', email);
    // Você pode chamar a API novamente aqui
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Ícone de Sucesso */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>E-mail Enviado!</Text>

        {/* Mensagem */}
        <Text style={styles.message}>
          Enviamos um link de recuperação para:
        </Text>
        <Text style={styles.emailText}>{email}</Text>

        {/* Instruções */}
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>
              Abra seu e-mail e procure pela mensagem do UaiMED
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>
              Clique no link "Redefinir Senha"
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>
              Digite sua nova senha e confirme
            </Text>
          </View>
        </View>

        {/* Aviso */}
        <View style={styles.warningBox}>
          <Ionicons name="information-circle" size={20} color="#FF9800" />
          <Text style={styles.warningText}>
            Se não receber o e-mail, verifique a pasta de Spam
          </Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleGoToLogin}
          >
            <Text style={styles.buttonPrimaryText}>VOLTAR AO LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleResendEmail}
          >
            <Text style={styles.buttonSecondaryText}>Reenviar E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F7F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 30,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 13,
    color: '#E65100',
    marginLeft: 10,
    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmailEnviadoScreen;
