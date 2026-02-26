# 🐛 Debug Rápido - Network Error

**Data**: 12 de Novembro de 2025

---

## ⚡ **Checklist Rápido (2 minutos)**

### ✅ 1. Backend está rodando?
```powershell
# Verificar porta
netstat -ano | findstr :3333

# Testar health check
curl http://localhost:3333/api/health
```
**Deve retornar**: `{"status":"OK",...}`

### ✅ 2. Verificar Logs do App

Quando o app iniciar, procure no console do Metro/Expo:

```
🔗 API Base URL configurada: http://10.0.2.2:3333/api
🌐 Ambiente: development
```

**Se aparecer `localhost` em vez de `10.0.2.2`**, a detecção não funcionou.

### ✅ 3. Testar Requisição

Ao tentar fazer login, verifique no console:

```
📤 POST http://10.0.2.2:3333/api/sessions
```

**Se aparecer `localhost`**, o problema é a detecção de plataforma.

---

## 🔧 **Soluções Rápidas**

### Solução 1: Forçar URL Android (Temporário)

Edite `uaimed-front/api/uaiMedApi.ts` e force a URL:

```typescript
const uaiMedApi: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3333/api', // FORÇA ANDROID
  // ...
});
```

### Solução 2: Limpar Cache e Reconstruir

```powershell
cd uaimed-front
npm start -- --reset-cache
# Depois escolha 'a' para Android
```

### Solução 3: Verificar Backend

```powershell
cd uaimed-back
# Pare o servidor (Ctrl+C)
npm run dev
# Deve aparecer: 🚀 Backend UaiMED iniciado em http://localhost:3333
```

---

## 📊 **Logs Esperados**

### ✅ **Sucesso**
```
📱 Plataforma detectada: android
✅ Usando URL Android: http://10.0.2.2:3333/api
🔗 API Base URL configurada: http://10.0.2.2:3333/api
📤 POST http://10.0.2.2:3333/api/sessions
✅ 200
```

### ❌ **Erro - URL Errada**
```
🔗 API Base URL configurada: http://localhost:3333/api  ← ERRADO!
📤 POST http://localhost:3333/api/sessions
❌ Network Error
```

**Solução**: Forçar URL Android (Solução 1 acima)

### ❌ **Erro - Backend Não Responde**
```
📤 POST http://10.0.2.2:3333/api/sessions
❌ Network Error
🔴 ERRO DE CONEXÃO DETECTADO
```

**Solução**: Verificar se backend está rodando (Solução 3 acima)

---

## 🎯 **Teste Rápido**

1. Abra o app no Android
2. Abra o console do Metro/Expo
3. Tente fazer login
4. Copie os logs que aparecem
5. Compare com os logs esperados acima

---

## 💡 **Dica**

Se ainda não funcionar após todas as soluções:
1. Copie TODOS os logs do console
2. Verifique qual URL está sendo usada
3. Teste se o backend responde no localhost
4. Envie os logs para análise

