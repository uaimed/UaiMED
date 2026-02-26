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
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import uaiMedApi from '../../api/uaiMedApi';
import { Ionicons } from '@expo/vector-icons';

type CadastroScreenProps = StackScreenProps<AuthStackParamList, 'Cadastro'>;

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation, route }) => {
  // If the user came from TipoSelecao, a tipoUsuario may be provided.
  const initialTipo = route?.params?.tipoUsuario ?? 'paciente';
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tipo, setTipo] = useState<'paciente' | 'medico' | 'clinica'>(initialTipo);

  // If a tipo was provided via navigation params, hide the selector to avoid conflicting choices
  const hideTipoSelector = Boolean(route?.params?.tipoUsuario);

  // Campos para profissional
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [dataFormacao, setDataFormacao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  /**
   * Valida e formata CPF
   */
  const formatCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  /**
   * Valida e formata Telefone
   */
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  /**
   * Valida o CPF usando algoritmo de verificação
   */
  const isValidCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

    return true;
  };

  /**
   * Valida o email
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida a senha (mínimo 6 caracteres)
   */
  const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  /**
   * Função de Cadastro
   */
  const handleCadastro = async () => {
    // Validações locais
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu nome completo.');
      return;
    }

    if (!isValidCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Verifique o número digitado.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido. Verifique o formato.');
      return;
    }

    if (!telefone.replace(/\D/g, '') || telefone.replace(/\D/g, '').length < 10) {
      Alert.alert('Erro', 'Telefone inválido. Verifique o número.');
      return;
    }

    if (!isValidPassword(senha)) {
      Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Se for profissional, validar campos obrigatórios
    if (tipo === 'medico') {
      if (!especialidade.trim() || !crm.trim()) {
        Alert.alert('Erro', 'Preencha especialidade e CRM para prosseguir.');
        return;
      }
    }

    setLoading(true);

    try {
      // Monta payload
      const payload: any = {
        nome: nome.trim(),
        cpf: cpf.replace(/\D/g, ''),
        email: email.trim(),
        telefone: telefone.replace(/\D/g, ''),
        senha: senha,
        tipo,
      };

      if (tipo === 'medico') {
        payload.especialidade = especialidade.trim();
        payload.crm = crm.trim();
        if (dataFormacao) payload.dataFormacao = dataFormacao; // expect ISO string or simple date
        payload.endereco = endereco.trim();
        payload.cidade = cidade.trim();
        payload.estado = estado.trim();
        payload.cep = cep.replace(/\D/g, '');
      }

      // Chamada à API para cadastrar
      const response = await uaiMedApi.post('/usuarios', payload);

      if (response.status === 201 || response.status === 200) {
        Alert.alert(
          'Sucesso!',
          'Seu cadastro foi realizado com sucesso. Faça login para continuar.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
        // Limpa os campos após sucesso
        setNome('');
        setCpf('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setConfirmaSenha('');
      }
    } catch (error: any) {
      let errorMessage = 'Não foi possível completar o cadastro.';

      if (error.response?.status === 409) {
        errorMessage = 'CPF ou E-mail já cadastrado no sistema.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === 'Network Error') {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }

      Alert.alert('Erro no Cadastro', errorMessage);
      console.error('Erro de cadastro:', error);

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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Novo Cadastro</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* Formulário */}
          <View style={styles.formSection}>
            {/* Nome */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="João Silva"
                value={nome}
                onChangeText={setNome}
                editable={!loading}
              />
            </View>

            {/* CPF */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF *</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                value={formatCPF(cpf)}
                onChangeText={setCpf}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail *</Text>
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

            {/* Telefone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone *</Text>
              <TextInput
                style={styles.input}
                placeholder="(11) 98765-4321"
                keyboardType="phone-pad"
                value={formatPhone(telefone)}
                onChangeText={setTelefone}
                editable={!loading}
              />
            </View>

            {/* Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  value={senha}
                  onChangeText={setSenha}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirmar Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmaSenha}
                  onChangeText={setConfirmaSenha}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Tipo de usuário (only shown when not navigated from TipoSelecao) */}
          {!hideTipoSelector && (
            <View style={[styles.inputContainer, { marginTop: 6 }]}>
              <Text style={styles.label}>Você é</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  style={[
                    styles.pill,
                    tipo === 'paciente' ? styles.pillActive : styles.pillInactive,
                  ]}
                  onPress={() => setTipo('paciente')}
                >
                  <Text style={tipo === 'paciente' ? styles.pillTextActive : styles.pillTextInactive}>Paciente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.pill,
                    tipo === 'medico' ? styles.pillActive : styles.pillInactive,
                  ]}
                  onPress={() => setTipo('medico')}
                >
                  <Text style={tipo === 'medico' ? styles.pillTextActive : styles.pillTextInactive}>Profissional</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Campos adicionais para profissional */}
          {tipo === 'medico' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Especialidade *</Text>
                <TextInput style={styles.input} placeholder="Cardiologia" value={especialidade} onChangeText={setEspecialidade} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>CRM *</Text>
                <TextInput style={styles.input} placeholder="CRM00000" value={crm} onChangeText={setCrm} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Data de Formação</Text>
                <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dataFormacao} onChangeText={setDataFormacao} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput style={styles.input} placeholder="Rua, número" value={endereco} onChangeText={setEndereco} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Estado</Text>
                <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} editable={!loading} />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>CEP</Text>
                <TextInput style={styles.input} placeholder="00000-000" value={cep} onChangeText={setCep} editable={!loading} keyboardType="numeric" />
              </View>
            </>
          )}

          {/* Botões */}
          <View style={styles.buttonsSection}>
            <TouchableOpacity
              style={[styles.buttonPrimary, loading && styles.buttonDisabled]}
              onPress={handleCadastro}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>CADASTRAR</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.buttonSecondaryText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.requiredNote}>* Campo obrigatório</Text>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
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
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 18,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  buttonsSection: {
    marginTop: 20,
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondaryText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requiredNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: '#4CAF50',
  },
  pillInactive: {
    backgroundColor: '#F0F0F0',
  },
  pillTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  pillTextInactive: {
    color: '#333',
    fontWeight: '600',
  },
});

export default CadastroScreen;
