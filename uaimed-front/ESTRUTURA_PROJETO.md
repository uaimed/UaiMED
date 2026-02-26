# 📁 Estrutura do Projeto UaiMED

```
uaimed/
├── App.tsx                          # Ponto de entrada da aplicação
├── app.json                         # Configuração do Expo
├── package.json                     # Dependências do projeto
├── tsconfig.json                    # Configuração TypeScript
├── MELHORIAS_REALIZADAS.md          # Documento de mudanças
├── ESTRUTURA_PROJETO.md             # Este arquivo
│
├── src/
│   ├── api/
│   │   └── uaiMedApi.ts            # Instância do Axios com interceptadores
│   │
│   ├── context/
│   │   └── AuthContext.tsx         # Contexto de autenticação global
│   │
│   ├── hooks/
│   │   └── useAuth.ts              # Hook para acessar contexto de autenticação
│   │
│   ├── navigation/
│   │   ├── index.tsx               # AppNavigator (switch entre Auth e Main)
│   │   ├── AuthStack.tsx           # Stack de autenticação (Login, Cadastro, etc)
│   │   ├── MainTabNavigation.tsx    # Bottom tabs (Home, Agendamentos, Perfil)
│   │   ├── AgendamentoStack.tsx    # Stack aninhada para agendamento
│   │   └── types.ts                # Tipagens de navegação
│   │
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx                # Tela de login
│   │   │   ├── CadastroScreen.tsx            # Tela de cadastro com validações
│   │   │   ├── RecuperarSenhaScreen.tsx      # Tela de recuperação de senha
│   │   │   └── EmailEnviadoScreen.tsx        # Confirmação de email enviado
│   │   │
│   │   ├── Main/
│   │   │   ├── HomeScreen.tsx                # Tela inicial
│   │   │   ├── AgendamentosScreen.tsx        # Lista de agendamentos
│   │   │   └── PerfilScreen.tsx              # Perfil do usuário
│   │   │
│   │   └── Agendamento/
│   │       ├── SearchScreen.tsx              # Busca de médicos e especialidades
│   │       ├── ResultadosScreen.tsx          # (TODO) Lista de resultados
│   │       ├── MedicoDetalhesScreen.tsx      # (TODO) Dados do médico
│   │       ├── SelecaoHorarioScreen.tsx      # (TODO) Calendário e horários
│   │       └── ConfirmacaoScreen.tsx         # (TODO) Confirmação de agendamento
│   │
│   ├── styles/
│   │   ├── index.ts                # Exportação dos estilos
│   │   └── themes.ts               # Cores, tipografia e estilos globais
│   │
│   └── components/                 # (TODO) Componentes reutilizáveis
│       ├── Button.tsx              # (TODO) Botão padrão
│       ├── Input.tsx               # (TODO) Input padrão
│       ├── Card.tsx                # (TODO) Card padrão
│       └── Modal.tsx               # (TODO) Modal padrão
│
├── assets/                         # Imagens, ícones, fontes
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── index.ts                        # Exportação principal

```

## 🏗️ Arquitetura do Projeto

### Fluxo de Autenticação

```
App.tsx
  └─ AuthProvider (Context)
     └─ AppNavigator
        ├─ AuthStack (usuário não autenticado)
        │  ├─ LoginScreen
        │  ├─ CadastroScreen
        │  ├─ RecuperarSenhaScreen
        │  └─ EmailEnviadoScreen
        └─ MainTabNavigator (usuário autenticado)
           ├─ HomeScreen
           ├─ AgendamentosScreen
           └─ PerfilScreen
              └─ AgendamentoStack
                 └─ SearchScreen
```

## 📊 Estrutura de Dados

### User (AuthContext)

```typescript
{
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  tipo: 'paciente' | 'medico';
}
```

### LoginResponse (API)

```typescript
{
  user: User;
  token: string;
}
```

### Agendamento (Main Screen)

```typescript
{
  id: string;
  medico: string;
  especialidade: string;
  data: string;
  status: "confirmado" | "cancelado" | "realizado";
}
```

## 🎨 Sistema de Design

### Cores Primárias

- **Primary**: `#4CAF50` (Verde UaiMED)
- **Secondary**: `#4B73B2` (Azul)
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Background**: `#F9F9F9`
- **Borders**: `#DDD`

### Tipografia

- **h1**: 32px bold
- **h2**: 28px bold
- **h3**: 24px semi-bold
- **body**: 16px regular
- **label**: 14px semi-bold
- **caption**: 12px regular

### Espaçamento

- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- xxl: 24px

## 🔑 Principais Funcionalidades

### ✅ Implementadas

- [x] Autenticação com Context API
- [x] Login com validações
- [x] Cadastro com CPF e validações avançadas
- [x] Recuperação de senha
- [x] Confirmação de email
- [x] Persistência de sessão (AsyncStorage)
- [x] Bottom tab navigation
- [x] Stack navigation aninhada
- [x] API integration com Axios
- [x] Token management com interceptadores
- [x] Tema global com cores padronizadas

### 🔲 A Fazer

- [ ] Telas de agendamento (Resultados, Detalhes, Horário)
- [ ] Componentes reutilizáveis (Button, Input, Card, Modal)
- [ ] Médicos favoritos
- [ ] Histórico de agendamentos
- [ ] Notificações push
- [ ] Dark mode
- [ ] Internacionalização (PT-BR, EN, ES)
- [ ] Testes unitários
- [ ] Testes de integração

## 📦 Dependências Principais

```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-navigation/native": "^7.1.19",
  "@react-navigation/stack": "^7.6.3",
  "@react-navigation/bottom-tabs": "^7.x.x",
  "@expo/vector-icons": "^latest",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "axios": "^latest",
  "typescript": "~5.9.2"
}
```

## 🚀 Como Rodar o Projeto

```bash
# Instalar dependências
npm install

# Iniciar o Expo
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

## 📝 Convenções de Código

### Nomes de Arquivos

- Componentes React: `PascalCase` (ex: `LoginScreen.tsx`)
- Serviços e utilidades: `camelCase` (ex: `uaiMedApi.ts`)
- Tipos e interfaces: `PascalCase`

### Imports

```typescript
// React e React Native
import React from "react";
import { View, Text } from "react-native";

// Bibliotecas externas
import { useNavigation } from "@react-navigation/native";

// Código local (em ordem)
import { useAuth } from "../../hooks/useAuth";
import uaiMedApi from "../../api/uaiMedApi";
import { colors } from "../../styles/themes";
```

### Tipos e Interfaces

```typescript
// Sempre exportar tipos que serão usados em outras partes
export interface User {
  id: string;
  nome: string;
}

// Tipos locais sem export
type LocalType = {
  id: string;
};
```

## 🔍 Documentação de Componentes

Cada tela/componente deve ter:

```typescript
/**
 * NomeDaTela
 * Breve descrição da funcionalidade
 */
const NomeDaTela: React.FC<Props> = (props) => {
  // Código aqui
};
```

## ✅ Checklist de Qualidade

- [x] Todos os arquivos estão bem organizados
- [x] Tipagem TypeScript completa
- [x] Validações robustas em formulários
- [x] Tratamento de erros da API
- [x] Padrão visual consistente
- [x] Comentários descritivos
- [x] TODOs marcados para futuro desenvolvimento
- [x] Sem código duplicado
- [x] Estrutura escalável

---

**Projeto bem estruturado e pronto para crescimento! 🎉**
