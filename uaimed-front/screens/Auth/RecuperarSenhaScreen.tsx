import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import uaiMedApi from '../../api/uaiMedApi';
import { Ionicons } from '@expo/vector-icons';

type RecuperarSenhaScreenProps = StackScreenProps<AuthStackParamList, 'RecuperarSenha'>;

const RecuperarSenhaScreen: React.FC<RecuperarSenhaScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Valida o email
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Função para enviar email de recuperação
   */
  const handleRecuperarSenha = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido. Verifique o formato.');
      return;
    }

    setLoading(true);

    try {
      // Chamada à API para solicitar recuperação
      const response = await uaiMedApi.post('/password-recovery', {
        email: email.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        // Navega para tela de confirmação
        navigation.navigate('EmailEnviado', { email });
      }
    } catch (error: any) {
      let errorMessage = 'Não foi possível processar sua solicitação.';

      if (error.response?.status === 404) {
        errorMessage = 'Este e-mail não está cadastrado no sistema.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }

      Alert.alert('Erro na Recuperação', errorMessage);
      console.error('Erro de recuperação:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Recuperar Senha</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* Conteúdo */}
          <View style={styles.mainSection}>
            {/* Ícone */}
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={64} color="#4CAF50" />
            </View>

            {/* Instruções */}
            <Text style={styles.instructionTitle}>Recupere sua Senha</Text>
            <Text style={styles.instructionText}>
              Digite seu e-mail cadastrado e enviaremos um link para você redefinir sua senha.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail Cadastrado</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            {/* Botão de Envio */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRecuperarSenha}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>ENVIAR LINK</Text>
              )}
            </TouchableOpacity>

            {/* Link para voltar ao login */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default RecuperarSenhaScreen;
