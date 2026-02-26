# 🧪 Guia de Teste Rápido - 3 Opções Implementadas

Data: 11 de Novembro de 2025

---

## 📱 Como Testar no Simulador/Dispositivo

### Pré-requisitos

- Node.js instalado
- Expo CLI (`npm install -g expo-cli`)
- Simulador iOS/Android ou dispositivo físico com Expo Go

---

## 🚀 Iniciar o Aplicativo

No terminal, na pasta do projeto:

```bash
# Limpar cache e iniciar
npx expo start -c

# Ou simplesmente
npm run start
```

Será exibido um menu:

- Pressione `i` para abrir no simulador iOS
- Pressione `a` para abrir no simulador Android
- Digitalize o QR Code com Expo Go no seu telefone

---

## ✅ Teste A: Hook `useContatos` + Tela de Contato

### Passos

1. **Abra o app** e navegue até **Home** (aba principal)
2. Veja o carrossel "Profissionais em destaque"
3. Clique no botão **"Contato"** (abaixo de qualquer profissional)
4. **Tela de contato abre** com o `medicoId` pré-preenchido
5. Preencha:
   - **Assunto**: ex. "Dúvida sobre exame"
   - **Mensagem**: ex. "Qual é o preparo?"
6. Clique **"Enviar Mensagem"**
   - Indicador de carregamento (~1.2s)
   - Alert de sucesso
   - Volta ao carrossel

### ✨ Resultado Esperado

- ✅ Formulário valida (rejeita campos vazios)
- ✅ Indicador de carregamento aparece
- ✅ Alert de sucesso com mensagem
- ✅ Navegação volta corretamente

### 🔍 Testar Validação

- Tente enviar **sem preencher** assunto ou mensagem
- Deve recusar com alert: "Preencha assunto e mensagem."

---

## 💳 Teste B: Hook `usePayments` + Tela de Pagamento

### Passos

1. **Navegue até a tela de Pagamento** (via código ou menu)

   - Dica: você pode adicionar um botão em um agendamento fictício
   - Ou abrir via: `navigation.navigate('Pagamento', { amount: 150 })`

2. **Veja as informações**
   - Valor base: R$ 100.00 (padrão)
   - Selecione método: Pix, Cartão ou Dinheiro

### 📋 Teste Método: Cartão

3. Clique em **"Cartão"**
4. Preencha:
   - Número: qualquer número
   - Nome: "João Silva"
   - MM/AA: "12/25"
   - CVV: "123"
5. Veja a seção **"Descontos"**
   - Toggle **"Plano de saúde"** → Desconto de 15% aplicado
   - Campo "Cupom": teste cupons

### 🎟️ Teste Cupom Válido

6. No campo **"Cupom / Código Promocional"**, digite: `UAIMED10`
7. Clique **"Aplicar"**
   - Alert: "Cupom válido" → Desconto de 10% aplicado
   - Total deve recalcular: 100 × 0.85 × 0.90 = R$ 76.50

### 🎟️ Teste Cupom Inválido

8. Digite: `INVALIDO` e clique "Aplicar"
   - Alert: "Cupom inválido"
   - Desconto anterior é removido

### 💰 Teste Cálculo Final

9. Com plano ativado (15%) + cupom UAIMED10 (10%):

   - Base: R$ 100
   - Após plano: R$ 85 (100 × 0.85)
   - Após cupom: R$ 76.50 (85 × 0.90)
   - **Total mostrado**: R$ 76.50 ✓

10. Clique **"Pagar R$ 76.50"**
    - Indicador de carregamento (~1.5s)
    - Alert de sucesso com ID do pagamento
    - Volta ao anterior

### ✨ Resultado Esperado

- ✅ Seleção de método funciona
- ✅ Cartão exige dados antes de enviar
- ✅ Cupom valida e aplica desconto
- ✅ Valor recalcula dinamicamente
- ✅ Indicador de carregamento aparece
- ✅ Alert de sucesso com ID da transação

---

## ⭐ Teste C: Hook `useAvaliacoes` + Exibição de Médias

### Teste 1: Carousel

1. **Abra o app** e vá para **Home**
2. Veja o carrossel "Profissionais em destaque"
3. **Observe cada card**:
   - Deve aparecer **um spinner** ao lado da estrela (carregando nota)
   - Após ~0.5s, a nota aparece (ex.: 4.3 ⭐)
   - Nota é aleatória entre 3.5 e 5.0 (simulada)

### Teste 2: Perfil

4. Abra a aba **"Perfil"** (última aba inferior)
5. Na seção "Informações Pessoais":
   - Se você fez login como **"medico"** ou **"clinica"**:
     - Deve aparecer campo "Avaliação média"
     - Mostra spinner durante carregamento
     - Após ~0.5s, exibe nota (ex.: "4.2 / 5")
   - Se você fez login como **"paciente"**:
     - Campo "Avaliação média" **não aparece** (comportamento correto)

### ✨ Resultado Esperado

- ✅ Spinner aparece enquanto carrega
- ✅ Nota média exibe corretamente após carregamento
- ✅ Notas são diferentes a cada recarga (simuladas)
- ✅ Apenas profissionais/clínicas veem sua nota

---

## 🧪 Testes de Validação

### Teste de Erro

- No hook `useContatos`, o campo `error` armazena mensagens de erro
- Você pode forçar erro modificando a chamada (próxima versão com backend real)

### Teste de Loading

- Todos os 3 hooks têm estado `loading`
- Use para desabilitar botões enquanto processa
- ✅ `ContatoProfissionalScreen` já desabilita campos durante `loading`
- ✅ `PagamentoScreen` já desabilita durante `loading`

### Teste Offline (opcional)

- Desconecte a internet
- Tente enviar contato/pagamento
- Hook simulado ainda funcionará
- Em produção com backend real, exibirá erro de conexão

---

## 📊 Dados de Teste

### Para Contato

```
Profissional: qualquer do carrossel (ex.: "Dr. João Silva")
Assunto: "Dúvida sobre preparo"
Mensagem: "Qual é o preparo recomendado para este exame?"
```

### Para Pagamento

```
Valor: R$ 100.00 (padrão)
Método: Cartão / Pix / Dinheiro
Cupom: UAIMED10 ou PRIMEIRACOMPRA
Plano: Toggle ON/OFF para 15% desconto
```

### Para Avaliações

```
Médico ID: automaticamente preenchido (med-001, med-002, etc.)
Nota esperada: entre 3.5 e 5.0
```

---

## 🐛 Troubleshooting

### "Erro: Cannot find module useContatos"

- ✅ Arquivo criado em `src/hooks/useContatos.ts`
- Tente: Command Palette → "TypeScript: Restart TS Server"

### "Tela de Contato não abre"

- Verifique se clicou no botão "Contato" do carousel (verde)
- Confirme que a navegação está registrada em `AgendamentoStack.tsx`

### "Cupom não valida"

- Teste com: `UAIMED10` (10%) ou `PRIMEIRACOMPRA` (20%)
- Outros códigos retornam "inválido" (correto)

### "Spinner de carregamento não aparece"

- Spinner usa `ActivityIndicator` (React Native)
- Pode estar muito rápido (0.5s de simulação)
- Aumente o delay em `useAvaliacoes.ts` para teste visual

### "Nota média mostra 0.0"

- Se `notaMedia` for null, exibe "Sem avaliações"
- Se for 0, exibe "0.0 / 5" (normal se avaliação real for 0)

---

## ✨ Checklist de Teste Completo

- [ ] Hook `useContatos` criado e funcionando
- [ ] Tela de contato abre com medicoId correto
- [ ] Validação de campos (obrigatórios)
- [ ] Carregamento simulado funciona
- [ ] Alert de sucesso aparece
- [ ] Navegação volta após envio

- [ ] Hook `usePayments` criado e funcionando
- [ ] Tela de pagamento exibe valor correto
- [ ] Seleção de método (3 opções)
- [ ] Dados de cartão são coletados
- [ ] Cupom valida corretamente
- [ ] Desconto de plano calcula
- [ ] Valor final recalcula dinamicamente
- [ ] Carregamento simulado funciona
- [ ] Alert de sucesso com ID aparece

- [ ] Hook `useAvaliacoes` expandido
- [ ] Carousel exibe spinner durante carregamento
- [ ] Carousel exibe nota após carregamento
- [ ] Perfil exibe nota se for médico/clínica
- [ ] Perfil NÃO exibe nota se for paciente
- [ ] Notas variam entre 3.5 e 5.0 (simuladas)

---

## 🎯 Próximos Passos (Integração Real)

Uma vez que tudo funciona, para integrar com backend real:

1. **Contato**: substitua em `useContatos.ts`:

   ```typescript
   const response = await uaiMedApi.post("/contatos", dados);
   return response.data;
   ```

2. **Pagamento**: substitua em `usePayments.ts`:

   ```typescript
   const response = await uaiMedApi.post("/pagamentos", dados);
   return response.data;
   ```

3. **Médias**: substitua em `useAvaliacoes.ts`:
   ```typescript
   const response = await uaiMedApi.get(`/avaliacoes/medico/${id}/media`);
   setNotaMedia(response.data.notaMedia);
   ```

---

## 📞 Dúvidas?

Consulte:

- `CONTACT_GUIDE.md` — detalhes de contato
- `PAYMENTS_GUIDE.md` — detalhes de pagamento
- `IMPLEMENTACAO_3_OPCOES.md` — resumo técnico
- Código dos hooks em `src/hooks/`

**Bom teste! 🎉**
