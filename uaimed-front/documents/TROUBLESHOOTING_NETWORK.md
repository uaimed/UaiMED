# 🔧 Troubleshooting: Erro "Network Error" no Login

Data: 11 de Novembro de 2025

---

## ❌ Problema: "AxiosError: Network Error"

Você vê um alert com mensagem de erro de conexão ao tentar fazer login.

---

## 🔍 Causas Comuns

### 1️⃣ Backend não está rodando

**Sintomas**:

- Alert: "Erro de conexão com o servidor"
- Console: `ECONNREFUSED` ou `Network Error`

**Solução**:

```bash
# Terminal na pasta do seu backend (Node.js/Express)
npm run dev
# ou
npm start
# ou outra variante dependendo do seu projeto

# Confirme que o servidor está rodando em: http://localhost:3333
# Você deve ver algo como:
# ✓ Server running at http://localhost:3333
```

### 2️⃣ URL da API está incorreta

**Sintomas**:

- Alert: "Servidor não encontrado"
- Console: `ENOTFOUND`

**Solução**:

1. Abra `src/api/uaiMedApi.ts`
2. Verifique a linha:
   ```typescript
   const ACTIVE_ENV = "localhost"; // ← Altere aqui
   ```
3. Escolha um dos ambientes disponíveis:
   - `'localhost'` — para desenvolvimento na mesma máquina
   - `'local'` — para teste em simulador/dispositivo (use seu IP)
   - `'staging'` — se você tiver servidor de staging
   - `'production'` — para produção

### 3️⃣ Usando simulador: backend não é acessível do simulador

**Sintomas**:

- Login funciona no browser (`localhost:3333`) mas não no simulador
- Alert: "Erro de conexão"

**Solução - iOS Simulator**:

```bash
# 1. Descubra seu IP local
# No Mac, abra Terminal:
ipconfig getifaddr en0
# Exemplo de saída: 192.168.1.100

# 2. Altere uaiMedApi.ts:
# const ACTIVE_ENV = 'local'; // Use este
# E na seção API_URLS, certifique-se que local aonta para seu IP:
# local: 'http://192.168.1.100:3333/api'
```

**Solução - Android Emulator**:

```bash
# Android Emulator pode acessar o host via 10.0.2.2
# Altere uaiMedApi.ts:
# const API_BASE_URL = 'http://10.0.2.2:3333/api';

# OU use Genymotion (que permite 192.168.x.x diretamente)
```

**Solução - Dispositivo Físico**:

```bash
# 1. Certifique-se que o dispositivo está na mesma rede WiFi
# 2. Obtenha seu IP local:
#    Windows: ipconfig
#    Mac/Linux: ifconfig
# 3. Altere uaiMedApi.ts para sua URL:
const API_URLS = {
  local: 'http://[SEU_IP]:3333/api', // Ex: http://192.168.1.50:3333/api
};
```

### 4️⃣ Backend rodando mas em porta diferente

**Sintomas**:

- Backend está rodando, mas em outra porta (ex: 5000, 8000)

**Solução**:

1. Confirme a porta no console do backend (ex: "Server on port 5000")
2. Altere `uaiMedApi.ts`:
   ```typescript
   const API_URLS = {
     localhost: "http://localhost:5000/api", // Alterou porta de 3333 para 5000
     // ...
   };
   ```

### 5️⃣ Firewall bloqueando conexão

**Sintomas**:

- Tudo parece estar certo, mas conexão não passa
- Console: `Network Error` ou timeout

**Solução**:

```bash
# Windows: Permitir Node.js no Firewall
# 1. Abra "Windows Defender Firewall with Advanced Security"
# 2. Clique "Inbound Rules"
# 3. Clique "New Rule"
# 4. Selecione seu Node.exe e permita

# macOS: Permitir na porta 3333
# sudo lsof -i :3333  (para ver se algo está usando)
# Se nada, o firewall pode estar bloqueando

# Linux:
sudo ufw allow 3333/tcp
```

---

## ✅ Checklist de Verificação

### Passo 1: Backend Rodando?

```bash
# No terminal do seu backend, rode:
npm run dev

# Procure por uma mensagem como:
# ✓ Server running at http://localhost:3333
# ou
# listening on port 3333
```

### Passo 2: URL Correta?

```typescript
// src/api/uaiMedApi.ts
// Verifique se a URL corresponde ao seu backend:
const API_URLS = {
  localhost: "http://localhost:3333/api", // ← Porta 3333?
};
```

### Passo 3: Ambiente Correto?

```typescript
// src/api/uaiMedApi.ts
// Escolha o ambiente ativo:
const ACTIVE_ENV = "localhost"; // ← Qual você escolheu?
```

### Passo 4: Teste de Conectividade

```bash
# Terminal (Windows PowerShell)
curl http://localhost:3333/api

# Terminal (Mac/Linux)
curl http://localhost:3333/api

# Você deve receber uma resposta (não necessariamente JSON, mas algo)
# Se receber "Connection refused" ou timeout, o backend não está rodando
```

### Passo 5: Verificar Console do App

```typescript
// O AuthContext agora exibe detalhes no console:
// Abra DevTools do Expo (pressione 'i' no terminal Expo)
// Procure por "Erro de login completo:" com:
// - message
// - code
// - status
// - baseURL
```

---

## 🛠️ Soluções Rápidas Por Cenário

### "Erro na minha máquina com backend local"

```typescript
// uaiMedApi.ts
const ACTIVE_ENV = "localhost";
// Certifique-se: const API_URLS.localhost = 'http://localhost:3333/api'
```

Verifique: `npm run dev` no terminal do backend

### "Erro no simulador iOS/Android"

```typescript
// uaiMedApi.ts
const ACTIVE_ENV = "local";
// Altere para seu IP:
// local: 'http://[SEU_IP]:3333/api'
// Exemplo: 'http://192.168.1.50:3333/api'
```

Obtenha IP: `ipconfig` (Windows) ou `ifconfig` (Mac)

### "Erro em dispositivo físico"

```typescript
// uaiMedApi.ts
const ACTIVE_ENV = "local";
// local: 'http://[IP_DA_MÁQUINA]:3333/api'
```

Certifique-se: dispositivo e máquina na mesma rede WiFi

### "Backend em porta diferente"

```typescript
// uaiMedApi.ts
const API_URLS = {
  localhost: "http://localhost:5000/api", // ← Altere 3333 para sua porta
};
```

### "Usando servidor em produção/staging"

```typescript
// uaiMedApi.ts
const ACTIVE_ENV = "production";
// Ou: const ACTIVE_ENV = 'staging';
```

---

## 📝 Criando um Arquivo .env (Recomendado para Produção)

Para não hardcoding URLs, você pode usar variáveis de ambiente:

1. Instale `dotenv`:

```bash
npm install dotenv
```

2. Crie `.env` na raiz:

```
API_BASE_URL=http://localhost:3333/api
ENVIRONMENT=development
```

3. Altere `uaiMedApi.ts`:

```typescript
import * as dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333/api";
```

---

## 🧪 Teste da API Diretamente

Antes de testar no app, teste a API diretamente:

### Via cURL

```bash
# GET simples
curl http://localhost:3333/api

# POST de login
curl -X POST http://localhost:3333/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"senha123"}'
```

### Via Postman

1. Abra Postman
2. Crie uma requisição POST
3. URL: `http://localhost:3333/api/sessions`
4. Body (JSON):
   ```json
   {
     "email": "teste@example.com",
     "password": "senha123"
   }
   ```
5. Envie e veja a resposta

### Via Browser

```javascript
// No console do browser (F12 → Console):
fetch("http://localhost:3333/api/sessions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "teste@example.com",
    password: "senha123",
  }),
})
  .then((r) => r.json())
  .then((d) => console.log(d))
  .catch((e) => console.error(e));
```

Se qualquer um desses funcionar, a API está rodando. Se nenhum funcionar, seu backend não está acessível.

---

## 📊 Tabela de Diagnóstico

| Erro no App               | Erro no Console   | Possível Causa      | Solução                        |
| ------------------------- | ----------------- | ------------------- | ------------------------------ |
| "Erro de conexão"         | `Network Error`   | Backend não rodando | `npm run dev` no backend       |
| "Servidor não encontrado" | `ENOTFOUND`       | URL incorreta       | Verifique `uaiMedApi.ts`       |
| "Servidor recusou"        | `ECONNREFUSED`    | Porta errada        | Altere porta em `uaiMedApi.ts` |
| Timeout (demora muito)    | `ETIMEDOUT`       | Firewall bloqueando | Verificar firewall             |
| "Erro desconhecido"       | `code: undefined` | Formato de resposta | Verificar resposta da API      |

---

## 🆘 Se Nada Funcionar

1. **Reinicie o app**:

   ```bash
   # Terminal do Expo
   # Pressione 'c' para limpar cache
   # Ou: npx expo start -c
   ```

2. **Reinicie o backend**:

   ```bash
   # Terminal do backend
   # Ctrl+C para parar
   # npm run dev para iniciar de novo
   ```

3. **Verifique o console do app**:

   - DevTools do Expo
   - Procure por "Erro de login completo:" com detalhes de erro

4. **Verifique o console do backend**:

   - Procure por requests recebidas (logs de acesso)
   - Se não houver, a requisição não está chegando

5. **Se ainda não funcionar**:
   - Teste via cURL/Postman primeiro
   - Confirme que sua API responde em alguma ferramenta
   - Depois tente no app

---

## 📚 Referências

- **Axios Error Handling**: https://github.com/axios/axios#handling-errors
- **React Native Network**: https://reactnative.dev/docs/network
- **AsyncStorage**: https://react-native-async-storage.github.io/

---

## 💡 Dicas de Desenvolvimento

### Use hardcoded credenciais para teste

```typescript
// LoginScreen.tsx - durante desenvolvimento
const [email, setEmail] = useState("teste@example.com");
const [password, setPassword] = useState("senha123");
```

### Adicione logs para debug

```typescript
// uaiMedApi.ts
uaiMedApi.interceptors.request.use((config) => {
  console.log("🚀 Request:", config.baseURL, config.url);
  return config;
});

uaiMedApi.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status);
    return response;
  },
  (error) => {
    console.log("❌ Error:", error.message, error.code);
    return Promise.reject(error);
  }
);
```

### Backend com CORS

Se seu backend está em outra máquina, certifique-se que CORS está habilitado:

```javascript
// Express exemplo:
const cors = require("cors");
app.use(cors()); // Permite todas as origins
// OU específico:
app.use(cors({ origin: "http://localhost:8081" }));
```

---

**Precisa de ajuda? Verifique o arquivo de console do app e do backend com as dicas acima!** ✨
