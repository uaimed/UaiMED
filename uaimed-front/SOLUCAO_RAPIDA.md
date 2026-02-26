# ⚡ Solução Rápida - Problemas de Conexão

**Se você está tendo problemas de conexão, siga estes passos:**

---

## 🚀 **Solução Rápida (2 minutos)**

### Passo 1: Verificar Backend
```powershell
# Verificar se está rodando
netstat -ano | findstr :3333

# Se não estiver, iniciar:
cd uaimed-back
npm run dev
```

### Passo 2: Limpar Cache do Frontend
```powershell
cd uaimed-front
npm start -- --reset-cache
# Depois escolha 'a' para Android
```

### Passo 3: Verificar Logs
No console do Metro/Expo, procure por:
```
📱 [getBaseUrl] Plataforma detectada: android
✅ [getBaseUrl] Usando URL Android: http://10.0.2.2:3333/api
🔗 [uaiMedApi] API Base URL configurada: http://10.0.2.2:3333/api
```

**Se aparecer `localhost` em vez de `10.0.2.2`**, veja Solução de Emergência abaixo.

---

## 🔧 **Solução de Emergência**

Se ainda não funcionar, **force a URL Android**:

### Edite `uaimed-front/api/uaiMedApi.ts`:

Encontre a linha 70-71:
```typescript
const uaiMedApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,  // ← ALTERE ESTA LINHA
```

**Altere para:**
```typescript
const uaiMedApi: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3333/api', // FORÇA ANDROID
```

Salve e reinicie o app.

---

## 🔄 **Alternativa: Usar IP da Máquina**

Se `10.0.2.2` não funcionar, use seu IP local:

### 1. Descubra seu IP:
```powershell
ipconfig
# Procure por "IPv4 Address" (ex: 192.168.2.19)
```

### 2. Altere `uaimed-front/config/index.ts`:
```typescript
android: 'http://192.168.2.19:3333/api', // Seu IP
```

### 3. Reinicie o app

---

## ✅ **Checklist Rápido**

- [ ] Backend rodando? (`netstat -ano | findstr :3333`)
- [ ] Health check funciona? (`curl http://localhost:3333/api/health`)
- [ ] Cache limpo? (`npm start -- --reset-cache`)
- [ ] Logs mostram `10.0.2.2`? (não `localhost`)
- [ ] App reiniciado após mudanças?

---

## 📞 **Se Ainda Não Funcionar**

1. Copie TODOS os logs do console
2. Verifique qual URL está sendo usada
3. Teste se o backend responde no localhost
4. Envie os logs para análise

---

## 💡 **Dica**

Os logs agora são muito detalhados. Sempre verifique:
- `📱 Plataforma detectada` → Deve ser `android`
- `🔗 API Base URL` → Deve ser `10.0.2.2:3333`
- `📤 POST` → Mostra a URL completa da requisição

