# 🔍 Revisão Completa da Conexão Frontend ↔ Backend

**Data**: 12 de Novembro de 2025

---

## ✅ **Status Atual**

### Backend
- ✅ **Rodando**: Porta 3333 (PID: 17012)
- ✅ **Health Check**: Respondendo corretamente
- ✅ **CORS**: Configurado para permitir todas origens em desenvolvimento
- ✅ **Rotas**: `/api/sessions` (login) e `/api/usuarios` (cadastro) disponíveis

### Frontend
- ✅ **Cleartext Traffic**: Habilitado no `app.json`
- ✅ **Detecção de Plataforma**: Implementada
- ✅ **URLs Configuradas**: 
  - Android: `http://10.0.2.2:3333/api`
  - iOS: `http://localhost:3333/api`
  - Web: `http://localhost:3333/api`

---

## 🔧 **Configurações Verificadas**

### 1. Backend (`uaimed-back/src/app.ts`)
```typescript
// ✅ CORS permite todas origens em desenvolvimento
if (ENV.NODE_ENV === "development") {
  return callback(null, true);
}
```

### 2. Frontend (`uaimed-front/app.json`)
```json
{
  "android": {
    "usesCleartextTraffic": true  // ✅ Permite HTTP
  }
}
```

### 3. Frontend (`uaimed-front/api/uaiMedApi.ts`)
```typescript
// ✅ Detecta plataforma automaticamente
// ✅ Usa 10.0.2.2 para Android
// ✅ Atualiza URL dinamicamente em cada requisição
```

---

## 🧪 **Teste de Conectividade**

### 1. Teste do Backend (Localhost)
```powershell
curl http://localhost:3333/api/health
# ✅ Deve retornar: {"status":"OK",...}
```

### 2. Teste do Backend (10.0.2.2)
**Nota**: `10.0.2.2` só funciona DENTRO do Android Simulator. Não funciona no terminal do Windows.

### 3. Verificar Logs do App

Quando o app iniciar, você deve ver:

```
📱 [getBaseUrl] Plataforma detectada: android
✅ [getBaseUrl] Usando URL Android: http://10.0.2.2:3333/api
🔗 [uaiMedApi] API Base URL configurada: http://10.0.2.2:3333/api
🌐 [uaiMedApi] Ambiente: development
```

**Se aparecer `localhost` em vez de `10.0.2.2`**, a detecção não funcionou.

---

## 🚨 **Problemas Possíveis e Soluções**

### Problema 1: Detecção de Plataforma Falhando

**Sintomas**:
- Logs mostram `localhost:3333` em vez de `10.0.2.2:3333`
- Não aparece `📱 Plataforma detectada: android`

**Solução**:
1. Limpe o cache:
   ```powershell
   cd uaimed-front
   npm start -- --reset-cache
   ```

2. Force a URL Android temporariamente:
   Edite `uaimed-front/api/uaiMedApi.ts` linha 36:
   ```typescript
   baseURL: 'http://10.0.2.2:3333/api', // FORÇA ANDROID
   ```

### Problema 2: Backend Não Acessível do Android

**Sintomas**:
- Logs mostram URL correta (`10.0.2.2:3333`)
- Erro: `Network Error` ou `ECONNREFUSED`

**Soluções**:

**Opção A**: Usar IP da Máquina
1. Descubra seu IP:
   ```powershell
   ipconfig
   # Use o IP da sua rede local (ex: 192.168.2.19)
   ```

2. Altere `uaimed-front/config/index.ts`:
   ```typescript
   android: 'http://192.168.2.19:3333/api', // Seu IP
   ```

**Opção B**: Verificar Firewall
- Windows Firewall pode estar bloqueando
- Adicione Node.js às exceções ou desative temporariamente

### Problema 3: Cleartext Traffic Bloqueado

**Sintomas**:
- Erro: `Cleartext HTTP traffic not permitted`

**Solução**:
✅ Já configurado! `usesCleartextTraffic: true` no `app.json`

Se ainda não funcionar:
1. Reconstrua o app completamente
2. Limpe o cache do Android Simulator
3. Reinstale o app

---

## 📋 **Checklist de Diagnóstico**

Execute este checklist na ordem:

- [ ] **1. Backend está rodando?**
  ```powershell
  netstat -ano | findstr :3333
  curl http://localhost:3333/api/health
  ```

- [ ] **2. Logs do app mostram URL correta?**
  - Deve aparecer: `http://10.0.2.2:3333/api`
  - Não deve aparecer: `http://localhost:3333/api`

- [ ] **3. Plataforma foi detectada?**
  - Deve aparecer: `📱 Plataforma detectada: android`

- [ ] **4. Requisição está sendo feita?**
  - Deve aparecer: `📤 POST http://10.0.2.2:3333/api/sessions`

- [ ] **5. Qual erro específico aparece?**
  - `Network Error` → Problema de conexão
  - `CORS Error` → Problema de CORS
  - `Timeout` → Backend não responde
  - `400/401` → Problema de dados/autenticação

---

## 🔄 **Solução de Emergência**

Se nada funcionar, use esta configuração temporária:

### 1. Forçar URL no `uaiMedApi.ts`:
```typescript
const uaiMedApi: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3333/api', // FORÇA ANDROID
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 20 segundos
});
```

### 2. Ou usar IP da máquina:
```typescript
baseURL: 'http://192.168.2.19:3333/api', // Seu IP local
```

---

## 📊 **Resumo das Configurações**

| Item | Status | Valor |
|------|--------|-------|
| Backend Porta | ✅ | 3333 |
| Backend CORS | ✅ | Permite tudo em dev |
| Android URL | ✅ | `10.0.2.2:3333/api` |
| Cleartext Traffic | ✅ | Habilitado |
| Detecção Plataforma | ✅ | Implementada |
| Timeout | ✅ | 15 segundos |
| Logs | ✅ | Detalhados |

---

## 🎯 **Próximos Passos**

1. ✅ Reinicie o app com cache limpo
2. ✅ Verifique os logs no console
3. ✅ Copie os logs completos se ainda não funcionar
4. ✅ Teste com IP da máquina se `10.0.2.2` não funcionar

---

## 💡 **Dica Final**

Os logs agora são muito detalhados. Sempre verifique:
- Qual URL está sendo usada
- Se a plataforma foi detectada
- Qual erro específico está ocorrendo
- Se o backend está respondendo no localhost

Com essas informações, fica muito mais fácil identificar o problema!

