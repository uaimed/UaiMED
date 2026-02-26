📋 # Sistema de Avaliação de Consultas - UaiMED

## 🎯 Visão Geral

O **Sistema de Avaliação** permite que pacientes avaliem suas experiências após consultas médicas. É um componente crítico para manter a qualidade de atendimento e coletar feedback dos usuários.

---

## 📱 Componentes Implementados

### 1. **Tela de Avaliação (AvaliacaoScreen)**

**Localização:** `src/screens/Agendamento/AvaliacaoScreen.tsx`

**Funcionalidades:**

- ⭐ **Avaliação por Estrelas (1-5):**

  - Qualidade do Atendimento
  - Pontualidade do Médico
  - Infraestrutura da Clínica
  - Comunicação do Médico

- 🎯 **Perguntas de Sim/Não/Talvez:**

  - "Voltaria à clínica?"
  - "Recomendaria o médico?"

- 📝 **Campos de Texto:**
  - Comentário obrigatório (0-500 caracteres)
  - Sugestões de melhoria opcional (0-300 caracteres)

**Validações:**

- Todas as avaliações de estrelas são obrigatórias
- Respostas sim/não/talvez são obrigatórias
- Comentário deve ter pelo menos 1 caractere
- Limite de caracteres com contador em tempo real

**Estrutura Visual:**

```
┌─────────────────────────────────┐
│  ⭐ Avalie sua Consulta         │
│  Sua opinião é importante...    │
├─────────────────────────────────┤
│  👤 Qualidade do Atendimento    │
│  ⭐ ⭐ ⭐ ⭐ ⭐                  │
├─────────────────────────────────┤
│  ⏱️ Pontualidade                 │
│  ⭐ ⭐ ⭐ ⭐ ⭐                  │
├─────────────────────────────────┤
│  🏥 Infraestrutura da Clínica    │
│  ⭐ ⭐ ⭐ ⭐ ⭐                  │
├─────────────────────────────────┤
│  💬 Comunicação                  │
│  ⭐ ⭐ ⭐ ⭐ ⭐                  │
├─────────────────────────────────┤
│  ✓ Voltaria à Clínica?         │
│  [ Sim ] [ Não ] [ Talvez ]    │
├─────────────────────────────────┤
│  👍 Recomendaria o Médico?      │
│  [ Sim ] [ Não ] [ Talvez ]    │
├─────────────────────────────────┤
│  📝 Sua Experiência              │
│  [Comentário...]                │
│  150/500 caracteres             │
├─────────────────────────────────┤
│  💡 Sugestões de Melhoria       │
│  [Sugestões...]                 │
│  50/300 caracteres              │
├─────────────────────────────────┤
│  [  ENVIAR AVALIAÇÃO  ]         │
│  [  CANCELAR  ]                 │
└─────────────────────────────────┘
```

---

### 2. **Tela de Histórico de Avaliações (HistoricoAvaliacoesScreen)**

**Localização:** `src/screens/Agendamento/HistoricoAvaliacoesScreen.tsx`

**Funcionalidades:**

- 📊 Exibição de todas as avaliações do paciente
- 🔄 Atualização via pull-to-refresh
- 📅 Data da avaliação formatada
- ⭐ Média de avaliações por card
- 🎯 Grid de notas individuais (Atendimento, Pontualidade, Clínica, Comunicação)
- ✓ Status de "Voltaria?" e "Recomenda?"
- 💬 Comentário resumido
- 💡 Sugestões exibidas em card especial

**Estados:**

- ✓ Carregado com dados
- ⏳ Carregando (ActivityIndicator)
- 🚫 Vazio (sem avaliações realizadas)
- 🔄 Atualizando via refresh

**Botão Flutuante:**

- Acesso rápido para criar nova avaliação
- Posicionado no canto inferior direito

**Estrutura Visual:**

```
┌─────────────────────────────────┐
│  📋 Meus Feedbacks              │
│  5 avaliações realizadas        │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 📅 05/11/2025     ⭐ 4.8   │ │
│ ├─────────────────────────────┤ │
│ │ 👤 Atend.  | ⏱ Pontual.   │ │
│ │ ★5★       | ★4★           │ │
│ │ 🏥 Clínica | 💬 Comun.    │ │
│ │ ★5★       | ★5★           │ │
│ ├─────────────────────────────┤ │
│ │ Voltaria: ✓ Sim            │ │
│ │ Recomenda: ✓ Sim           │ │
│ ├─────────────────────────────┤ │
│ │ "Atendimento excelente..."  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
            ┌─────┐
            │  ➕ │
            └─────┘
```

---

### 3. **Tela de Seleção de Tipo de Usuário (TipoSelecaoScreen)**

**Localização:** `src/screens/Auth/TipoSelecaoScreen.tsx`

**Funcionalidades:**

- 🎯 Escolha entre Paciente, Médico ou Clínica
- 📋 Card interativo para cada tipo
- ✓ Checkbox visual
- 📝 Descrição de cada tipo
- 💡 Lista de benefícios
- 🎨 Cores diferentes por tipo

**Tipos:**

- **Paciente** (#4CAF50 - Verde)

  - Agendar consultas
  - Histórico de consultas
  - Avaliação de atendimento
  - Notificações de lembretes

- **Médico** (#4B73B2 - Azul)

  - Gerenciar agenda
  - Visualizar agendamentos
  - Análise de avaliações
  - Perfil profissional

- **Clínica** (#FF9800 - Laranja)
  - Gerenciar médicos
  - Relatórios e análises
  - Gestão de pacientes
  - Configurações da clínica

**Estrutura Visual:**

```
┌────────────────────────────────┐
│  🔀 Tipo de Cadastro           │
│  Escolha qual melhor...        │
├────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │ ☑ Sou Paciente          │   │
│ │ Agende consultas...     │   │
│ │ ✓ Agendar consultas     │   │
│ │ ✓ Histórico...          │   │
│ └──────────────────────────┘   │
│ ┌──────────────────────────┐   │
│ │ ☐ Sou Médico            │   │
│ │ Gerencie sua agenda...  │   │
│ │ ✓ Gerenciar agenda      │   │
│ │ ✓ Visualizar agendam... │   │
│ └──────────────────────────┘   │
│ ┌──────────────────────────┐   │
│ │ ☐ Sou uma Clínica       │   │
│ │ Administre sua clínica..│   │
│ │ ✓ Gerenciar médicos     │   │
│ │ ✓ Relatórios...         │   │
│ └──────────────────────────┘   │
├────────────────────────────────┤
│ ℹ️ Você pode alterar depois...│
├────────────────────────────────┤
│ [ ← VOLTAR ]  [ PRÓXIMO → ]   │
└────────────────────────────────┘
```

---

## 🔌 Integração de Navegação

### AuthStack (Atualizado)

```typescript
{
  Login → TipoSelecao → Cadastro
            ↓
       (com tipoUsuario)
}
```

### AgendamentoStack (Atualizado)

```typescript
{
  Busca
    ↓
  Avaliacao (nova)
    ↓
  HistoricoAvaliacoes (nova)
}
```

---

## 📊 Tipos de Dados

### Interface: `Avaliacao`

```typescript
{
  id: string;
  agendamentoId: string;
  medicoId: string;
  pacienteId: string;
  dataAvaliacao: string(ISO);

  // Notas (1-5)
  notaAtendimento: number;
  notaPuntualidade: number;
  notaClinica: number;
  notaComuni: number;

  // Respostas
  voltariaClinica: "sim" | "nao" | "talvez";
  recomendaMedico: "sim" | "nao" | "talvez";

  // Textos
  comentario: string;
  melhorias: string;

  // Metadados
  criadoEm: string(ISO);
  atualizadoEm: string(ISO);
}
```

### Interface: `RespostaAvaliacao`

```typescript
{
  notaAtendimento: number;
  notaPuntualidade: number;
  notaClinica: number;
  notaComuni: number;
  voltariaClinica: "sim" | "nao" | "talvez";
  recomendaMedico: "sim" | "nao" | "talvez";
  comentario: string;
  melhorias: string;
}
```

### Interface: `EstatisticasAvaliacao`

```typescript
{
  totalAvaliacoes: number;
  mediaAtendimento: number;
  mediaPuntualidade: number;
  mediaClinica: number;
  mediaComuni: number;
  percentualVoltaria: number; // 0-100
  percentualRecomenda: number; // 0-100
  avaliacoes: Avaliacao[];
}
```

---

## 🪝 Hook Customizado: `useAvaliacoes`

**Localização:** `src/hooks/useAvaliacoes.ts`

**Funcionalidades:**

```typescript
const {
  avaliacoes, // Array de todas as avaliações
  loading, // Estado de carregamento
  error, // Mensagem de erro
  loadAvaliacoes, // Função para carregar avaliações
  criarAvaliacao, // Função para criar nova avaliação
  calcularEstatisticas, // Calcula médias e percentuais
  avaliacoesMedico, // Retorna avaliações de um médico
} = useAvaliacoes();
```

**Exemplo de Uso:**

```typescript
const MyComponent = () => {
  const { avaliacoes, calcularEstatisticas } = useAvaliacoes();

  const stats = calcularEstatisticas();

  return (
    <View>
      <Text>Média: {stats.mediaAtendimento}</Text>
      <Text>Total: {stats.totalAvaliacoes}</Text>
    </View>
  );
};
```

---

## 🎨 Componente: `CardAvaliacao`

**Localização:** `src/components/CardAvaliacao.tsx`

**Props:**

```typescript
{
  avaliacao: Avaliacao;
  onPress?: () => void;
  compact?: boolean; // Versão reduzida
}
```

**Exemplo de Uso:**

```typescript
<CardAvaliacao
  avaliacao={minhaAvaliacao}
  onPress={() => handlePress()}
  compact={false}
/>
```

---

## 🔄 Fluxo de Avaliação

```
1. Paciente completa consulta
   ↓
2. Ao retornar à home, opção "Avaliar Consulta"
   ↓
3. Abre AvaliacaoScreen
   ↓
4. Preenche todas as notas e perguntas
   ↓
5. Escreve comentário obrigatório
   ↓
6. Clica "Enviar Avaliação"
   ↓
7. Validação no front-end
   ↓
8. Envio à API (com tratamento de erro)
   ↓
9. Sucesso: Toast + Volta
   ↓
10. Avaliação aparece em HistoricoAvaliacoes
```

---

## 🎯 Endpoints Esperados (Backend)

```
POST /avaliacoes
├─ Corpo: RespostaAvaliacao
└─ Retorno: Avaliacao

GET /avaliacoes
├─ Parâmetros: ?pacienteId=X&medicoId=Y
└─ Retorno: Avaliacao[]

GET /avaliacoes/:id
├─ Parâmetros: ID da avaliação
└─ Retorno: Avaliacao

PUT /avaliacoes/:id
├─ Corpo: Partial<Avaliacao>
└─ Retorno: Avaliacao

GET /avaliacoes/medico/:medicoId/stats
├─ Retorno: EstatisticasAvaliacao
└─ Mostra dados públicos do médico

GET /avaliacoes/stats
├─ Retorno: EstatisticasAvaliacao
└─ Dados pessoais do paciente
```

---

## 🔒 Segurança

- ✅ Validação de campos obrigatórios no front
- ✅ Limite de caracteres em comentários
- ✅ Autenticação via token (já implementada)
- ✅ Paciente só pode avaliar suas próprias consultas
- ✅ Médico não pode alterar avaliações de pacientes

---

## 📊 Casos de Uso

### Caso 1: Paciente Avalia Consulta

```
Login → Home → Consulta Realizada → "Avaliar"
  → AvaliacaoScreen → Preenche Formulário
  → Valida → Envia → HistoricoAvaliacoes
```

### Caso 2: Paciente Revisa Avaliações

```
Login → Menu Lateral → "Meus Feedbacks"
  → HistoricoAvaliacoes → Vê todas as avaliações
  → Pull-to-Refresh → Atualiza
  → FAB → Nova Avaliação
```

### Caso 3: Novo Paciente Escolhe Tipo

```
Login (falha) → "Criar Conta"
  → TipoSelecaoScreen → Seleciona "Paciente"
  → Cadastro (com tipo pré-preenchido)
  → Completa Cadastro → Login → Home
```

---

## 🚀 Próximas Melhorias

- [ ] Fotos de antes/depois (para alguns procedimentos)
- [ ] Anexar documentos ou recibos
- [ ] Compartilhar avaliações nas redes sociais
- [ ] Notificação ao médico sobre avaliação ruim (< 3 estrelas)
- [ ] Resposta do médico às avaliações
- [ ] Filtrar avaliações por data/período
- [ ] Exportar relatório em PDF
- [ ] Integração com sistema de pontos/rewards
- [ ] Análise de satisfação por especialidade
- [ ] Gráficos de tendência de avaliações

---

## 📝 Documentação de Código

Todos os arquivos incluem:

- ✅ Comentários JSDoc
- ✅ Tipos TypeScript completos
- ✅ Descrição de funcionalidades
- ✅ Exemplos de uso
- ✅ Tratamento de erros

---

## 🧪 Dados Simulados

A aplicação inclui dados simulados para testes:

**HistoricoAvaliacoesScreen:**

- 3 avaliações de exemplo
- Variação de notas (3-5 estrelas)
- Respostas diferentes (sim/não/talvez)
- Comentários realistas

**AvaliacaoScreen:**

- Todos os campos vazios (pronto para preenchimento)
- Validações ativas

---

## ✨ Conclusão

O **Sistema de Avaliação** está 100% implementado no front-end, com:

- ✅ 3 telas principais
- ✅ Componentes reutilizáveis
- ✅ Hook customizado
- ✅ Tipos TypeScript
- ✅ Validações completas
- ✅ UI/UX profissional
- ✅ Pronto para integração com backend

**Status:** 🟢 **COMPLETO E PRONTO PARA USAR**
