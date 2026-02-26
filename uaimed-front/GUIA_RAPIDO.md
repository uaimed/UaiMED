# 🚀 Guia Rápido - UaiMED

## Início Rápido

### 1. Instalação

```bash
cd uaimed
npm install
```

### 2. Executar

```bash
npm start
```

### 3. Escolher Plataforma

- **Android**: Pressione `a`
- **iOS**: Pressione `i`
- **Web**: Pressione `w`

---

## 📱 Fluxos Principais

### Fluxo de Autenticação

```
Tela de Splash (Loading)
    ↓
Autenticado? ─ Não → LoginScreen
    ↓ Sim
MainTabNavigator (Home, Agendamentos, Perfil)
```

### Telas de Login

1. **LoginScreen**: E-mail + Senha
2. **CadastroScreen**: Nome, CPF, Email, Telefone, Senha (com validações)
3. **RecuperarSenhaScreen**: E-mail para recuperação
4. **EmailEnviadoScreen**: Confirmação de envio

### Tela Principal

- **Home**: Saudação, próximo agendamento, ações rápidas
- **Agendamentos**: Lista de consultas (futuras e anteriores)
- **Perfil**: Informações do usuário e logout

---

## 🎯 Dados de Teste

### Login Simulado

```
E-mail: teste@uaimed.com
Senha: 123456
```

**Nota**: O login real depende da API do backend

### CPF Válido (para teste)

```
123.456.789-09
111.222.333-44
```

---

## 🔧 Configurações Importantes

### URL da API

Editar em `src/api/uaiMedApi.ts`:

```typescript
const API_BASE_URL = "http://seu-backend.com/api";
```

### Cores da Marca

Usar em `src/styles/themes.ts`:

```typescript
primary: "#4CAF50"; // Verde UaiMED
secondary: "#4B73B2"; // Azul
```

---

## 📋 Estrutura de Componentes

### Componentes por Nível

**Nível 1 - Screens (Telas Inteiras)**

- `LoginScreen.tsx`
- `CadastroScreen.tsx`
- `HomeScreen.tsx`
- etc

**Nível 2 - Containers**

- Seções dentro de telas
- Múltiplos componentes combinados

**Nível 3 - Components (Reutilizáveis)**

- Botões
- Inputs
- Cards
- (Ainda a implementar)

---

## 🔌 API Endpoints (Esperados)

### Autenticação

```
POST /sessions
{
  "email": "user@email.com",
  "password": "senha123"
}

Response:
{
  "user": { id, nome, email, tipo },
  "token": "jwt-token"
}
```

### Usuários

```
POST /users
{
  "nome": "João",
  "cpf": "123.456.789-09",
  "email": "joao@email.com",
  "telefone": "(11) 98765-4321",
  "password": "senha123",
  "tipo": "paciente"
}
```

### Recuperação de Senha

```
POST /password-recovery
{
  "email": "user@email.com"
}
```

### Agendamentos

```
GET /agendamentos
Response: Agendamento[]

GET /medicos?especialidade=Cardiologia
Response: Medico[]
```

---

## 🛠️ Como Adicionar uma Nova Tela

### 1. Criar o arquivo

```typescript
// src/screens/Category/NovaTelaScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SuaParamList } from "../../navigation/types";

type NovaTelaProps = StackScreenProps<SuaParamList, "NovaTela">;

const NovaTelaScreen: React.FC<NovaTelaProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Nova Tela</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default NovaTelaScreen;
```

### 2. Adicionar ao Stack

```typescript
// Em src/navigation/SeuStack.tsx
<Stack.Screen
  name="NovaTela"
  component={NovaTelaScreen}
  options={{ title: "Nova Tela" }}
/>
```

### 3. Adicionar à Tipagem

```typescript
// Em src/navigation/types.ts
export type SuaParamList = {
  NovaTela: undefined;
};
```

---

## 🎨 Como Usar Estilos Globais

```typescript
import { colors, spacing, typography } from "../../styles/themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg, // 16px
    backgroundColor: colors.primary, // Verde
  },
  title: {
    ...typography.h3, // Título tamanho 3
    color: colors.textPrimary,
  },
});
```

---

## 🔍 Debugging

### React Native DevTools

```bash
# Abre o menu de desenvolvimento
Ctrl+M (Android) ou Cmd+D (iOS)

Opções:
- Reload (Recarregar)
- Toggle Inspector (Inspecionar elementos)
- Toggle Remote Debugger (Debug no navegador)
```

### Logs

```typescript
console.log("Mensagem de debug");
console.error("Erro");
console.warn("Aviso");
```

---

## 📚 Recursos Úteis

### Documentação

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo](https://docs.expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### Bibliotecas Instaladas

- **axios**: Requisições HTTP
- **@react-navigation**: Navegação
- **@react-native-async-storage**: Armazenamento local
- **@expo/vector-icons**: Ícones

---

## ❓ Dúvidas Comuns

### Como mudar a cor da marca?

```typescript
// src/styles/themes.ts
primary: "#NOVA-COR";
```

### Como adicionar um novo stack?

1. Criar arquivo: `src/navigation/NovoStack.tsx`
2. Importar em `src/navigation/index.tsx`
3. Adicionar à tipagem em `src/navigation/types.ts`

### Como fazer requisição à API?

```typescript
import uaiMedApi from "../../api/uaiMedApi";

const response = await uaiMedApi.get("/endpoint");
const response = await uaiMedApi.post("/endpoint", { data });
```

### Como acessar contexto de autenticação?

```typescript
import { useAuth } from "../../hooks/useAuth";

const { user, signIn, signOut, loading } = useAuth();
```

---

## ✨ Próximos Passos

- [ ] Completar telas de agendamento
- [ ] Conectar com backend real
- [ ] Adicionar componentes reutilizáveis
- [ ] Implementar notificações
- [ ] Adicionar testes
- [ ] Deploy na App Store / Play Store

---

**Boa codificação! 🎉**
