# 🔧 Troubleshooting: Network Error no Android

**Data**: 12 de Novembro de 2025

---

## ✅ **Correções Aplicadas**

### 1. **Cleartext Traffic Habilitado**
- ✅ Adicionado `"usesCleartextTraffic": true` no `app.json`
- Permite requisições HTTP (não apenas HTTPS) no Android

### 2. **Detecção Automática de Plataforma**
- ✅ Android usa automaticamente: `http://10.0.2.2:3333/api`
- ✅ Logs detalhados para debug

### 3. **Logs Melhorados**
- ✅ Mostra qual URL está sendo usada
- ✅ Mostra qual plataforma foi detectada
- ✅ Erros de rede mostram detalhes completos

---

## 🔍 **Como Diagnosticar**

### Passo 1: Verificar Logs do App

Quando o app iniciar, você deve ver no console:

```
📱 Plataforma detectada: android
✅ Usando URL Android: http://10.0.2.2:3333/api
🔗 API Base URL configurada: http://10.0.2.2:3333/api
🌐 Ambiente: development
```

**Se não aparecer isso**, a detecção não está funcionando.

### Passo 2: Verificar Backend

```powershell
# Verificar se está rodando
netstat -ano | findstr :3333

# Testar health check
curl http://localhost:3333/api/health
```

**Deve retornar**: `{"status":"OK",...}`

### Passo 3: Verificar Erro Específico

Quando ocorrer o erro, verifique no console:

```
❌ Erro de rede completo: {
  message: "...",
  code: "...",
  baseURL: "http://10.0.2.2:3333/api",
  fullURL: "..."
}
```

---

## 🚨 **Problemas Comuns e Soluções**

### Problema 1: "Network Error" - Backend não acessível

**Sintomas**:
- Erro: `Network Error` ou `ECONNREFUSED`
- Logs mostram URL correta (`10.0.2.2:3333`)

**Solução**:
1. Verifique se o backend está rodando:
   ```powershell
   cd uaimed-back
   npm run dev
   ```

2. Teste se o backend responde:
   ```powershell
   curl http://localhost:3333/api/health
   ```

3. Se funcionar no localhost mas não no Android, o problema é a URL.

### Problema 2: URL errada sendo usada

**Sintomas**:
- Logs mostram `localhost:3333` em vez de `10.0.2.2:3333`
- Plataforma não detectada como Android

**Solução**:
1. Verifique os logs iniciais do app
2. Deve aparecer: `📱 Plataforma detectada: android`
3. Se não aparecer, reinicie o app:
   ```powershell
   # Pare o app (Ctrl+C)
   npm start -- --reset-cache
   npm run android
   ```

### Problema 3: Cleartext Traffic bloqueado

**Sintomas**:
- Erro: `Cleartext HTTP traffic not permitted`
- Android bloqueia requisições HTTP

**Solução**:
✅ Já corrigido! `usesCleartextTraffic: true` foi adicionado ao `app.json`

**Se ainda não funcionar**:
1. Reconstrua o app:
   ```powershell
   # Limpe o cache e reconstrua
   npm start -- --reset-cache
   # Depois, no Android Studio ou Expo, reconstrua o app
   ```

### Problema 4: CORS bloqueando

**Sintomas**:
- Erro: `CORS not allowed` ou `CORS policy`
- Backend retorna 403/401

**Solução**:
✅ Já corrigido! CORS permite todas origens em desenvolvimento.

**Verificar**:
- Backend deve estar em modo `development`
- Verifique `uaimed-back/src/app.ts` - deve ter:
  ```typescript
  if (ENV.NODE_ENV === "development") {
    return callback(null, true);
  }
  ```

---

## 🧪 **Teste Rápido**

### 1. Backend
```powershell
cd uaimed-back
npm run dev
# Deve aparecer: 🚀 Backend UaiMED iniciado em http://localhost:3333
```

### 2. Frontend
```powershell
cd uaimed-front
npm start -- --reset-cache
# Depois escolha 'a' para Android
```

### 3. Verificar Logs

No console do Metro/Expo, procure por:
- ✅ `📱 Plataforma detectada: android`
- ✅ `🔗 API Base URL configurada: http://10.0.2.2:3333/api`

### 4. Testar Requisição

Tente fazer login e verifique:
- ✅ Logs mostram a requisição sendo feita
- ✅ URL correta (`10.0.2.2:3333`)
- ✅ Resposta do backend (ou erro detalhado)

---

## 📋 **Checklist de Verificação**

- [ ] Backend rodando em `localhost:3333`
- [ ] Health check responde: `curl http://localhost:3333/api/health`
- [ ] App mostra logs de plataforma detectada
- [ ] URL configurada é `http://10.0.2.2:3333/api` (Android)
- [ ] `app.json` tem `usesCleartextTraffic: true`
- [ ] CORS permite todas origens em dev
- [ ] Cache limpo: `npm start -- --reset-cache`

---

## 🔄 **Se Ainda Não Funcionar**

### Opção 1: Forçar URL Android Manualmente

Temporariamente, force a URL no `config/index.ts`:

```typescript
export function getApiBaseUrl(): string {
  // FORÇA ANDROID TEMPORARIAMENTE PARA TESTE
  return 'http://10.0.2.2:3333/api';
}
```

### Opção 2: Usar IP da Máquina

Se `10.0.2.2` não funcionar, use o IP da sua máquina:

1. Descubra seu IP:
   ```powershell
   ipconfig
   # Procure por "IPv4 Address" (ex: 192.168.1.100)
   ```

2. Altere `config/index.ts`:
   ```typescript
   android: 'http://192.168.1.100:3333/api',
   ```

3. Certifique-se que backend aceita conexões externas (já configurado)

### Opção 3: Verificar Firewall

O Windows Firewall pode estar bloqueando:

1. Abra "Firewall do Windows Defender"
2. Verifique se Node.js está permitido
3. Ou desative temporariamente para testar

---

## 📊 **Resumo das Mudanças**

| Arquivo | Mudança | Status |
|---------|---------|--------|
| `app.json` | ✅ `usesCleartextTraffic: true` | ✅ Feito |
| `config/index.ts` | ✅ Detecção Android + Logs | ✅ Feito |
| `api/uaiMedApi.ts` | ✅ Logs detalhados de erro | ✅ Feito |
| `uaimed-back/src/app.ts` | ✅ CORS permite tudo em dev | ✅ Feito |

---

## 🎯 **Próximos Passos**

1. ✅ Reinicie o app com cache limpo
2. ✅ Verifique os logs no console
3. ✅ Teste uma requisição (login)
4. ✅ Se ainda não funcionar, envie os logs completos do console

---

## 💡 **Dica Final**

Os logs agora são muito mais detalhados. Sempre verifique:
- Qual URL está sendo usada
- Qual plataforma foi detectada
- Qual erro específico está ocorrendo

Com essas informações, fica muito mais fácil identificar o problema!

