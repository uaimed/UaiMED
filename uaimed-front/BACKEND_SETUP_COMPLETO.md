# 🏥 Setup Completo do Backend UaiMED

**Versão**: 1.0.0  
**Data**: 11 de Novembro de 2025  
**Stack**: Node.js + TypeScript + Express + Prisma ORM + PostgreSQL

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Passo a Passo](#instalação-passo-a-passo)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Configuração do Prisma](#configuração-do-prisma)
5. [Implementação das Rotas](#implementação-das-rotas)
6. [Autenticação com JWT](#autenticação-com-jwt)
7. [Integração com Frontend](#integração-com-frontend)
8. [Deploy em Produção](#deploy-em-produção)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

Antes de começar, instale os seguintes softwares:

### ✅ Obrigatório

- **Node.js** v18+ (https://nodejs.org)
  - Verificar: `node --version` e `npm --version`
- **Git** (para controle de versão)
- **PostgreSQL** v12+ (https://www.postgresql.org)
  - Ou use um serviço na nuvem: Supabase, Neon, Railway
- **VS Code** ou editor similar

### ✅ Recomendado

- **Postman** ou **Insomnia** (para testar APIs)
- **pgAdmin** ou **DBeaver** (para gerenciar banco de dados)
- **Git Desktop** (interface visual do Git)

---

## 🚀 Instalação Passo a Passo

### 1️⃣ Criar Pasta do Projeto Backend

```bash
# Crie uma pasta para o backend (no mesmo diretório do frontend)
mkdir uaimed-backend
cd uaimed-backend

# Inicie um repositório Git
git init
```

### 2️⃣ Inicializar Projeto Node.js

```bash
# Crie um package.json padrão
npm init -y

# Verifique se foi criado
dir  # ou 'ls' no Mac/Linux
```

### 3️⃣ Instalar Dependências

#### **Dependências de Produção**

```bash
# Framework Web
npm install express

# Autenticação e Criptografia
npm install jsonwebtoken bcryptjs uuid

# Banco de Dados
npm install @prisma/client

# Utilidades
npm install dotenv cors axios

# ID único (UUID v7)
npm install uuid
```

#### **Dependências de Desenvolvimento**

```bash
npm install -D \
  typescript \
  @types/node \
  @types/express \
  @types/jsonwebtoken \
  @types/bcryptjs \
  ts-node \
  nodemon \
  @prisma/cli
```

### 4️⃣ Verificar Instalação

Seu `package.json` deve parecer assim:

```json
{
  "name": "uaimed-backend",
  "version": "1.0.0",
  "description": "Backend UaiMED - Sistema de Agendamento Médico",
  "main": "dist/server.js",
  "scripts": {
    "dev": "ts-node -T src/server.ts",
    "start": "node dist/server.js",
    "build": "tsc",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "db:seed": "ts-node src/prisma/seed.ts"
  },
  "keywords": ["uaimed", "medico", "agendamento"],
  "author": "UaiMED",
  "license": "MIT",
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "axios": "^1.6.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.1.2",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@prisma/cli": "^5.7.1",
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^20.10.5",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

### 5️⃣ Criar arquivo TypeScript Config

Crie `tsconfig.json` na raiz do projeto:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 6️⃣ Criar Arquivo `.env`

Crie `.env` na raiz (com dados reais):

```env
# ============================================
# AMBIENTE
# ============================================
NODE_ENV=development
PORT=3333

# ============================================
# BANCO DE DADOS
# ============================================
# PostgreSQL local
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/uaimed"

# Ou use um serviço na nuvem (exemplo Supabase):
# DATABASE_URL="postgresql://user:password@db.xxx.supabase.co:5432/postgres"

# ============================================
# AUTENTICAÇÃO
# ============================================
JWT_SECRET="sua-chave-super-secreta-alterar-em-producao"
JWT_EXPIRE_IN="7d"

# ============================================
# CRIPTOGRAFIA
# ============================================
BCRYPT_ROUNDS=10

# ============================================
# CORS
# ============================================
# URL do frontend
FRONTEND_URL="http://localhost:19000"
# Para Expo no simulador:
# FRONTEND_URL="http://127.0.0.1:19000"
```

Crie também `.env.example` (sem dados sensíveis):

```env
NODE_ENV=development
PORT=3333
DATABASE_URL="postgresql://user:password@localhost:5432/uaimed"
JWT_SECRET="sua-chave-secreta"
JWT_EXPIRE_IN="7d"
BCRYPT_ROUNDS=10
FRONTEND_URL="http://localhost:19000"
```

---

## 📁 Estrutura de Pastas

Crie a seguinte estrutura dentro de `uaimed-backend/`:

```
uaimed-backend/
├── src/
│   ├── server.ts                 # Arquivo principal do servidor
│   ├── config/
│   │   └── database.ts           # Conexão com banco de dados
│   ├── middleware/
│   │   ├── auth.ts               # Middleware de autenticação
│   │   └── errorHandler.ts       # Tratamento de erros global
│   ├── routes/
│   │   ├── auth.routes.ts        # Rotas de autenticação
│   │   ├── contatos.routes.ts    # Rotas de contatos
│   │   ├── pagamentos.routes.ts  # Rotas de pagamentos
│   │   ├── avaliacoes.routes.ts  # Rotas de avaliações
│   │   └── index.ts              # Agregador de rotas
│   ├── controllers/
│   │   ├── auth.controller.ts    # Lógica de autenticação
│   │   ├── contatos.controller.ts
│   │   ├── pagamentos.controller.ts
│   │   └── avaliacoes.controller.ts
│   ├── services/
│   │   ├── auth.service.ts       # Serviços de autenticação
│   │   ├── contatos.service.ts
│   │   ├── pagamentos.service.ts
│   │   └── avaliacoes.service.ts
│   ├── types/
│   │   └── express.d.ts          # Tipos customizados do Express
│   ├── utils/
│   │   ├── logger.ts             # Função de logging
│   │   ├── hash.ts               # Funções de criptografia
│   │   └── jwt.ts                # Funções JWT
│   └── prisma/
│       └── seed.ts               # Script de população do banco
├── prisma/
│   ├── schema.prisma             # Definição do banco de dados
│   └── migrations/               # Histórico de migrações
├── .env                          # Variáveis de ambiente
├── .env.example                  # Template do .env
├── .gitignore                    # Arquivos ignorados pelo Git
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências
└── README.md                     # Documentação

```

---

## 🗄️ Configuração do Prisma

### 1️⃣ Inicializar Prisma

```bash
npx prisma init --datasource-provider postgresql
```

Isso cria a pasta `prisma/` com `schema.prisma`.

### 2️⃣ Definir Schema (Banco de Dados)

Edite `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// MODELO: Usuario
// ============================================
model Usuario {
  id        String   @id @default(uuid()) // UUID v4
  nome      String
  email     String   @unique
  cpf       String   @unique
  telefone  String
  senha     String
  tipo      String   @default("paciente") // paciente, medico, clinica
  avatar    String?
  ativo     Boolean  @default(true)

  // Relacionamentos
  agendamentos  Agendamento[]
  avaliacoes    Avaliacao[]
  contatos      Contato[]
  pagamentos    Pagamento[]

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("usuarios")
}

// ============================================
// MODELO: Profissional (extends Usuario)
// ============================================
model Profissional {
  id          String  @id @default(uuid())
  usuarioId   String  @unique
  usuario     Usuario @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  especialidade String
  crm           String  @unique // Conselho Regional de Medicina
  dataFormacao  DateTime
  endereco      String
  cidade        String
  estado        String
  cep           String

  // Relacionamentos
  agendamentos  Agendamento[]
  avaliacoes    Avaliacao[]
  contatos      Contato[]

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("profissionais")
}

// ============================================
// MODELO: Agendamento
// ============================================
model Agendamento {
  id          String   @id @default(uuid())
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  profissionalId String
  profissional   Profissional @relation(fields: [profissionalId], references: [id], onDelete: Cascade)

  dataHora    DateTime
  duracao     Int      @default(30) // em minutos
  status      String   @default("agendado") // agendado, confirmado, cancelado
  observacoes String?

  // Relacionamento com pagamento
  pagamento   Pagamento?

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("agendamentos")
}

// ============================================
// MODELO: Avaliacao
// ============================================
model Avaliacao {
  id          String   @id @default(uuid())
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  profissionalId String
  profissional   Profissional @relation(fields: [profissionalId], references: [id], onDelete: Cascade)

  nota        Int      // 1 a 5 estrelas
  comentario  String?

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("avaliacoes")
}

// ============================================
// MODELO: Contato
// ============================================
model Contato {
  id          String   @id @default(uuid())
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  profissionalId String
  profissional   Profissional @relation(fields: [profissionalId], references: [id], onDelete: Cascade)

  assunto     String
  mensagem    String
  status      String   @default("nao_lido") // nao_lido, lido, respondido

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("contatos")
}

// ============================================
// MODELO: Pagamento
// ============================================
model Pagamento {
  id          String   @id @default(uuid())
  usuarioId   String
  usuario     Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  agendamentoId String  @unique
  agendamento   Agendamento @relation(fields: [agendamentoId], references: [id], onDelete: Cascade)

  valor       Float    // em reais
  desconto    Float    @default(0)
  valorFinal  Float
  metodo      String   // pix, credito, debito, dinheiro
  status      String   @default("pendente") // pendente, processando, concluido, falhou

  // Campos para cartão
  cartaoFinal String?  // últimos 4 dígitos

  // Campos para Pix
  pixChave    String?
  pixQrCode   String?

  // Cupom desconto
  cupom       String?

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("pagamentos")
}

// ============================================
// MODELO: Cupom
// ============================================
model Cupom {
  id          String   @id @default(uuid())
  codigo      String   @unique
  desconto    Int      // percentual (ex: 10 = 10%)
  dataExpiracao DateTime
  ativo       Boolean  @default(true)
  usosLimite  Int?     // null = ilimitado
  usosAtuais  Int      @default(0)

  criado_em DateTime @default(now())
  atualizado_em DateTime @updatedAt

  @@map("cupons")
}
```

### 3️⃣ Criar Banco de Dados

```bash
# Se estiver usando PostgreSQL local
createdb uaimed
```

### 4️⃣ Executar Primeira Migração

```bash
# Isso cria as tabelas no banco de dados
npx prisma migrate dev --name init
```

Você deve ver:

```
✔ Enter a name for the new migration: … init
✔ Your database is now in sync with your schema. Prisma has generated the Prisma Client in node_modules/@prisma/client.
```

### 5️⃣ Verificar com Prisma Studio

```bash
# Abre interface visual do banco de dados
npx prisma studio
```

---

## 🔐 Arquivos de Utilidade

### `src/config/database.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

### `src/utils/logger.ts`

```typescript
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️  [${new Date().toISOString()}] ${message}`, data || "");
  },

  error: (message: string, error?: any) => {
    console.error(`❌ [${new Date().toISOString()}] ${message}`, error || "");
  },

  success: (message: string, data?: any) => {
    console.log(`✅ [${new Date().toISOString()}] ${message}`, data || "");
  },

  warning: (message: string, data?: any) => {
    console.warn(`⚠️  [${new Date().toISOString()}] ${message}`, data || "");
  },
};

export default logger;
```

### `src/utils/hash.ts`

```typescript
import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10");

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export default { hashPassword, comparePassword };
```

### `src/utils/jwt.ts`

```typescript
import jwt from "jsonwebtoken";
import { v7 as uuidv7 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta";
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || "7d";

export interface TokenPayload {
  id: string;
  email: string;
  tipo: string;
  iat?: number;
  exp?: number;
}

export function generateToken(
  payload: Omit<TokenPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_IN,
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function generateUUIDv7(): string {
  return uuidv7();
}

export default { generateToken, verifyToken, generateUUIDv7 };
```

### `src/types/express.d.ts`

```typescript
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        tipo: string;
      };
    }
  }
}
```

### `src/middleware/auth.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import logger from "../utils/logger";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "Token não fornecido",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        error: "Token inválido ou expirado",
      });
    }

    req.user = decoded;
    logger.info(`✅ Usuário ${decoded.email} autenticado`);
    next();
  } catch (error) {
    logger.error("Erro na autenticação", error);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

export default authMiddleware;
```

### `src/middleware/errorHandler.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error("Erro não tratado", error);

  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor";

  res.status(status).json({
    error: message,
    status,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}

export default errorHandler;
```

---

## 🔌 Implementação das Rotas

### `src/services/auth.service.ts`

```typescript
import { prisma } from "../config/database";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import logger from "../utils/logger";

export interface SignUpData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
  tipo: "paciente" | "medico" | "clinica";
}

export interface SignInData {
  email: string;
  senha: string;
}

export class AuthService {
  async signup(data: SignUpData) {
    try {
      // Verificar se usuário existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (usuarioExistente) {
        throw new Error("Email já cadastrado");
      }

      // Hash da senha
      const senhaHash = await hashPassword(data.senha);

      // Criar usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          telefone: data.telefone,
          senha: senhaHash,
          tipo: data.tipo,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          tipo: true,
        },
      });

      // Gerar token
      const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
      });

      logger.success(`Novo usuário cadastrado: ${usuario.email}`);

      return {
        usuario,
        token,
      };
    } catch (error) {
      logger.error("Erro ao cadastrar usuário", error);
      throw error;
    }
  }

  async signin(data: SignInData) {
    try {
      // Buscar usuário
      const usuario = await prisma.usuario.findUnique({
        where: { email: data.email },
      });

      if (!usuario) {
        throw new Error("Email ou senha incorretos");
      }

      // Verificar senha
      const senhaValida = await comparePassword(data.senha, usuario.senha);

      if (!senhaValida) {
        throw new Error("Email ou senha incorretos");
      }

      // Gerar token
      const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
      });

      logger.success(`Usuário autenticado: ${usuario.email}`);

      return {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          telefone: usuario.telefone,
          tipo: usuario.tipo,
          avatar: usuario.avatar,
        },
        token,
      };
    } catch (error) {
      logger.error("Erro ao autenticar usuário", error);
      throw error;
    }
  }

  async verificarToken(token: string) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email: "teste@example.com" }, // Implementar com token
      });

      return usuario;
    } catch (error) {
      logger.error("Erro ao verificar token", error);
      throw error;
    }
  }
}

export default new AuthService();
```

### `src/controllers/auth.controller.ts`

```typescript
import { Request, Response } from "express";
import AuthService, { SignUpData, SignInData } from "../services/auth.service";
import logger from "../utils/logger";

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const data: SignUpData = req.body;

      // Validar campos obrigatórios
      if (
        !data.nome ||
        !data.email ||
        !data.cpf ||
        !data.telefone ||
        !data.senha
      ) {
        return res.status(400).json({
          error: "Preencha todos os campos",
        });
      }

      const result = await AuthService.signup(data);

      return res.status(201).json(result);
    } catch (error: any) {
      logger.error("Erro ao registrar", error);
      return res.status(400).json({
        error: error.message || "Erro ao registrar",
      });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { email, password }: SignInData = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email e senha são obrigatórios",
        });
      }

      const result = await AuthService.signin({
        email,
        senha: password,
      });

      return res.json(result);
    } catch (error: any) {
      logger.error("Erro ao autenticar", error);
      return res.status(401).json({
        error: error.message || "Erro ao autenticar",
      });
    }
  }
}

export default new AuthController();
```

### `src/routes/auth.routes.ts`

```typescript
import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

// POST /api/usuarios (signup)
router.post("/usuarios", (req, res) => AuthController.signup(req, res));

// POST /api/sessions (signin/login)
router.post("/sessions", (req, res) => AuthController.signin(req, res));

export default router;
```

### `src/controllers/contatos.controller.ts`

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/database";
import logger from "../utils/logger";

export class ContatosController {
  async criar(req: Request, res: Response) {
    try {
      const { profissionalId, assunto, mensagem } = req.body;
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!profissionalId || !assunto || !mensagem) {
        return res.status(400).json({ error: "Preencha todos os campos" });
      }

      const contato = await prisma.contato.create({
        data: {
          usuarioId,
          profissionalId,
          assunto,
          mensagem,
        },
      });

      logger.success(`Contato criado: ${contato.id}`);

      return res.status(201).json(contato);
    } catch (error: any) {
      logger.error("Erro ao criar contato", error);
      return res.status(500).json({ error: "Erro ao criar contato" });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const contatos = await prisma.contato.findMany({
        where: {
          OR: [{ usuarioId }, { profissionalId: usuarioId }],
        },
        include: {
          usuario: {
            select: { nome: true, email: true },
          },
          profissional: {
            select: { usuario: { select: { nome: true } } },
          },
        },
        orderBy: { criado_em: "desc" },
      });

      return res.json(contatos);
    } catch (error: any) {
      logger.error("Erro ao listar contatos", error);
      return res.status(500).json({ error: "Erro ao listar contatos" });
    }
  }
}

export default new ContatosController();
```

### `src/routes/contatos.routes.ts`

```typescript
import { Router } from "express";
import authMiddleware from "../middleware/auth";
import ContatosController from "../controllers/contatos.controller";

const router = Router();

router.use(authMiddleware);

// POST /api/contatos (criar contato)
router.post("/", (req, res) => ContatosController.criar(req, res));

// GET /api/contatos (listar contatos)
router.get("/", (req, res) => ContatosController.listar(req, res));

export default router;
```

### `src/controllers/pagamentos.controller.ts`

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/database";
import logger from "../utils/logger";

export class PagamentosController {
  async validarCupom(req: Request, res: Response) {
    try {
      const { codigo } = req.body;

      if (!codigo) {
        return res.status(400).json({ error: "Código do cupom obrigatório" });
      }

      const cupom = await prisma.cupom.findUnique({
        where: { codigo: codigo.toUpperCase() },
      });

      if (!cupom || !cupom.ativo) {
        return res.status(400).json({
          valido: false,
          mensagem: "Cupom inválido ou expirado",
        });
      }

      if (cupom.usosLimite && cupom.usosAtuais >= cupom.usosLimite) {
        return res.status(400).json({
          valido: false,
          mensagem: "Cupom expirado (limite de usos atingido)",
        });
      }

      if (new Date() > cupom.dataExpiracao) {
        return res.status(400).json({
          valido: false,
          mensagem: "Cupom expirado",
        });
      }

      return res.json({
        codigo: cupom.codigo,
        desconto: cupom.desconto,
        valido: true,
        dataExpiracao: cupom.dataExpiracao,
      });
    } catch (error: any) {
      logger.error("Erro ao validar cupom", error);
      return res.status(500).json({ error: "Erro ao validar cupom" });
    }
  }

  async processar(req: Request, res: Response) {
    try {
      const { agendamentoId, valor, metodo, cupom } = req.body;
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!agendamentoId || !valor || !metodo) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
      }

      let desconto = 0;

      // Se houver cupom, validar e obter desconto
      if (cupom) {
        const cupomData = await prisma.cupom.findUnique({
          where: { codigo: cupom.toUpperCase() },
        });

        if (cupomData?.ativo && new Date() < cupomData.dataExpiracao) {
          desconto = (valor * cupomData.desconto) / 100;

          // Atualizar uso do cupom
          await prisma.cupom.update({
            where: { id: cupomData.id },
            data: { usosAtuais: cupomData.usosAtuais + 1 },
          });
        }
      }

      const valorFinal = valor - desconto;

      const pagamento = await prisma.pagamento.create({
        data: {
          usuarioId,
          agendamentoId,
          valor,
          desconto,
          valorFinal,
          metodo,
          cupom,
          status: "concluido",
        },
      });

      logger.success(`Pagamento processado: ${pagamento.id}`);

      return res.status(201).json({
        id: pagamento.id,
        status: pagamento.status,
        valor: pagamento.valor,
        desconto: pagamento.desconto,
        valorFinal: pagamento.valorFinal,
        dataProcessamento: pagamento.criado_em,
      });
    } catch (error: any) {
      logger.error("Erro ao processar pagamento", error);
      return res.status(500).json({ error: "Erro ao processar pagamento" });
    }
  }
}

export default new PagamentosController();
```

### `src/routes/pagamentos.routes.ts`

```typescript
import { Router } from "express";
import authMiddleware from "../middleware/auth";
import PagamentosController from "../controllers/pagamentos.controller";

const router = Router();

// POST /api/cupons/validar (validar cupom)
router.post("/cupons/validar", (req, res) =>
  PagamentosController.validarCupom(req, res)
);

// POST /api/pagamentos (processar pagamento)
router.use(authMiddleware);
router.post("/", (req, res) => PagamentosController.processar(req, res));

export default router;
```

### `src/controllers/avaliacoes.controller.ts`

```typescript
import { Request, Response } from "express";
import { prisma } from "../config/database";
import logger from "../utils/logger";

export class AvaliacoesController {
  async criar(req: Request, res: Response) {
    try {
      const { profissionalId, nota, comentario } = req.body;
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!profissionalId || !nota || nota < 1 || nota > 5) {
        return res.status(400).json({
          error: "Profissional ID e nota (1-5) são obrigatórios",
        });
      }

      const avaliacao = await prisma.avaliacao.create({
        data: {
          usuarioId,
          profissionalId,
          nota,
          comentario,
        },
      });

      logger.success(`Avaliação criada: ${avaliacao.id}`);

      return res.status(201).json(avaliacao);
    } catch (error: any) {
      logger.error("Erro ao criar avaliação", error);
      return res.status(500).json({ error: "Erro ao criar avaliação" });
    }
  }

  async obterMedia(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Validar UUID
      if (!id || id.length !== 36) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const avaliacoes = await prisma.avaliacao.findMany({
        where: { profissionalId: id },
      });

      if (avaliacoes.length === 0) {
        return res.json({
          profissionalId: id,
          notaMedia: 0,
          totalAvaliacoes: 0,
        });
      }

      const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
      const notaMedia = parseFloat((soma / avaliacoes.length).toFixed(1));

      return res.json({
        profissionalId: id,
        notaMedia,
        totalAvaliacoes: avaliacoes.length,
        distribuicao: {
          cinco: avaliacoes.filter((a) => a.nota === 5).length,
          quatro: avaliacoes.filter((a) => a.nota === 4).length,
          tres: avaliacoes.filter((a) => a.nota === 3).length,
          dois: avaliacoes.filter((a) => a.nota === 2).length,
          um: avaliacoes.filter((a) => a.nota === 1).length,
        },
      });
    } catch (error: any) {
      logger.error("Erro ao obter média de avaliações", error);
      return res
        .status(500)
        .json({ error: "Erro ao obter média de avaliações" });
    }
  }
}

export default new AvaliacoesController();
```

### `src/routes/avaliacoes.routes.ts`

```typescript
import { Router } from "express";
import authMiddleware from "../middleware/auth";
import AvaliacoesController from "../controllers/avaliacoes.controller";

const router = Router();

// POST /api/avaliacoes (criar avaliação)
router.post("/", authMiddleware, (req, res) =>
  AvaliacoesController.criar(req, res)
);

// GET /api/avaliacoes/medico/:id/media (obter média)
router.get("/medico/:id/media", (req, res) =>
  AvaliacoesController.obterMedia(req, res)
);

export default router;
```

### `src/routes/index.ts`

```typescript
import { Router } from "express";
import authRoutes from "./auth.routes";
import contatosRoutes from "./contatos.routes";
import pagamentosRoutes from "./pagamentos.routes";
import avaliacoesRoutes from "./avaliacoes.routes";

const router = Router();

// Agregar todas as rotas
router.use("/usuarios", authRoutes);
router.use("/sessions", authRoutes);
router.use("/contatos", contatosRoutes);
router.use("/pagamentos", pagamentosRoutes);
router.use("/cupons", pagamentosRoutes);
router.use("/avaliacoes", avaliacoesRoutes);

export default router;
```

---

## 🚀 Servidor Principal

### `src/server.ts`

```typescript
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import logger from "./utils/logger";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:19000";

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================

// CORS - Permitir requisições do frontend
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:19000", "http://127.0.0.1:19000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROTAS DE SAÚDE
// ============================================

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ============================================
// AGREGAR ROTAS DA API
// ============================================

app.use("/api", routes);

// ============================================
// TRATAMENTO DE ERROS
// ============================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Rota não encontrada",
    path: req.path,
  });
});

app.use(errorHandler);

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  logger.success(`🚀 Backend UaiMED iniciado!`);
  logger.info(`📡 Servidor rodando em http://localhost:${PORT}`);
  logger.info(`🔌 API disponível em http://localhost:${PORT}/api`);
  logger.info(`📝 Documentação: http://localhost:${PORT}/api/docs`);
  logger.info(`🏥 Pronto para receber requisições do frontend!`);
  logger.info(`🗄️  Banco de dados: ${process.env.DATABASE_URL}`);
});
```

---

## 🌱 Seed Database (Popular banco com dados de teste)

### `src/prisma/seed.ts`

```typescript
import { prisma } from "../config/database";
import { hashPassword } from "../utils/hash";
import { generateUUIDv7 } from "../utils/jwt";
import logger from "../utils/logger";

async function main() {
  try {
    logger.info("🌱 Iniciando seed do banco de dados...");

    // Limpar dados existentes
    await prisma.pagamento.deleteMany();
    await prisma.avaliacao.deleteMany();
    await prisma.contato.deleteMany();
    await prisma.agendamento.deleteMany();
    await prisma.profissional.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.cupom.deleteMany();

    // Criar usuários de teste
    const paciente = await prisma.usuario.create({
      data: {
        id: generateUUIDv7(),
        nome: "João Paciente",
        email: "paciente@example.com",
        cpf: "123.456.789-00",
        telefone: "(11) 99999-9999",
        senha: await hashPassword("senha123"),
        tipo: "paciente",
      },
    });

    const medico = await prisma.usuario.create({
      data: {
        id: generateUUIDv7(),
        nome: "Dr. Carlos Silva",
        email: "medico@example.com",
        cpf: "987.654.321-00",
        telefone: "(11) 88888-8888",
        senha: await hashPassword("senha123"),
        tipo: "medico",
      },
    });

    // Criar profissional
    const profissional = await prisma.profissional.create({
      data: {
        id: generateUUIDv7(),
        usuarioId: medico.id,
        especialidade: "Cardiologia",
        crm: "123456/SP",
        dataFormacao: new Date("2015-06-01"),
        endereco: "Rua das Flores, 123",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
      },
    });

    // Criar cupons
    await prisma.cupom.create({
      data: {
        id: generateUUIDv7(),
        codigo: "UAIMED10",
        desconto: 10,
        dataExpiracao: new Date("2025-12-31"),
        ativo: true,
        usosLimite: 100,
      },
    });

    await prisma.cupom.create({
      data: {
        id: generateUUIDv7(),
        codigo: "PRIMEIRACOMPRA",
        desconto: 20,
        dataExpiracao: new Date("2025-12-31"),
        ativo: true,
      },
    });

    logger.success("✅ Seed concluído com sucesso!");
    logger.info("👤 Paciente: paciente@example.com / senha123");
    logger.info("👨‍⚕️  Médico: medico@example.com / senha123");
    logger.info("🎟️  Cupom: UAIMED10 (10% de desconto)");

    process.exit(0);
  } catch (error) {
    logger.error("Erro no seed", error);
    process.exit(1);
  }
}

main();
```

Adicione no `package.json`:

```json
{
  "scripts": {
    "db:seed": "ts-node src/prisma/seed.ts"
  }
}
```

---

## 🔌 Integração com Frontend

### Atualizar `src/config/index.ts` no Frontend

```typescript
export const CONFIG = {
  ENVIRONMENT: "development",
  API: {
    development: "http://localhost:3333/api",
    // ... resto da configuração
  },
};
```

### Atualizar Hooks para Usar API Real

**`src/hooks/useContatos.ts`**:

```typescript
export async function enviarContato(
  dados: ContatoData
): Promise<ContatoResponse> {
  // Ao invés de simular, chamar a API real:
  const response = await uaiMedApi.post("/contatos", {
    profissionalId: dados.medicoId,
    assunto: dados.assunto,
    mensagem: dados.mensagem,
  });
  return response.data;
}
```

**`src/hooks/usePayments.ts`**:

```typescript
export async function validarCupom(codigo: string): Promise<DiscountResponse> {
  const response = await uaiMedApi.post("/cupons/validar", { codigo });
  return response.data;
}
```

**`src/hooks/useAvaliacoes.ts`**:

```typescript
export async function carregarMediaAvaliacoes(medicoId: string) {
  const response = await uaiMedApi.get(`/avaliacoes/medico/${medicoId}/media`);
  return response.data.notaMedia;
}
```

---

## 📊 Testes com cURL / Postman

### 1. Registrar Novo Usuário

```bash
curl -X POST http://localhost:3333/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "email": "maria@example.com",
    "cpf": "111.222.333-44",
    "telefone": "(11) 99999-1111",
    "senha": "senha123",
    "tipo": "paciente"
  }'
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:3333/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "paciente@example.com",
    "password": "senha123"
  }'
```

Salve o `token` retornado!

### 3. Enviar Contato (Autenticado)

```bash
curl -X POST http://localhost:3333/api/contatos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "profissionalId": "id-do-profissional",
    "assunto": "Dúvida sobre consulta",
    "mensagem": "Olá, gostaria de agendar uma consulta"
  }'
```

### 4. Validar Cupom

```bash
curl -X POST http://localhost:3333/api/cupons/validar \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "UAIMED10"
  }'
```

### 5. Obter Média de Avaliações

```bash
curl http://localhost:3333/api/avaliacoes/medico/id-do-profissional/media
```

---

## 🚀 Executar Backend

### 1. Instalar Dependências

```bash
npm install
```

### 2. Criar Arquivo `.env`

Copie `.env.example` para `.env` e preencha com seus dados

### 3. Configurar Banco de Dados

```bash
# Criar banco PostgreSQL
createdb uaimed

# Executar migrações
npx prisma migrate dev --name init

# Popular com dados de teste
npm run db:seed
```

### 4. Iniciar Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Você deve ver:
# 🚀 Backend UaiMED iniciado!
# 📡 Servidor rodando em http://localhost:3333
# 🔌 API disponível em http://localhost:3333/api
# 🏥 Pronto para receber requisições do frontend!
```

### 5. Verificar Saúde

```bash
curl http://localhost:3333/api/health
```

---

## 🗄️ Gerenciar Banco de Dados

### Visualizar Dados em Tempo Real

```bash
npx prisma studio
```

Abre em http://localhost:5555 (interface visual!)

### Criar Nova Migração

```bash
# Após editar schema.prisma
npx prisma migrate dev --name descricao-da-mudanca
```

### Reset do Banco (⚠️ Apaga tudo!)

```bash
npx prisma migrate reset
```

---

## 🏗️ Build para Produção

### 1. Compilar TypeScript

```bash
npm run build
```

Isso cria a pasta `dist/` com JavaScript compilado.

### 2. Rodar em Produção

```bash
# Definir ambiente
set NODE_ENV=production
npm start
```

---

## 🔐 Deploy em Produção

### Opção 1: Railway (Recomendado - Fácil)

1. Faça upload para GitHub
2. Vá em https://railway.app
3. Conecte seu repositório
4. Configure variáveis de ambiente
5. Deploy automático!

### Opção 2: Heroku

```bash
# Instalar CLI do Heroku
npm install -g heroku

# Login
heroku login

# Criar app
heroku create seu-app-uaimed

# Configurar variáveis de ambiente
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=sua-chave-secreta

# Deploy
git push heroku main
```

### Opção 3: DigitalOcean / AWS

- Usar Docker para containerizar
- Usar nginx como reverse proxy
- Configurar HTTPS com Certbot

---

## 📝 Documentação de Endpoints (Swagger/OpenAPI)

Adicione ao `package.json`:

```bash
npm install swagger-ui-express swagger-jsdoc
```

Crie `src/swagger.ts`:

```typescript
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UaiMED API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
export const swaggerUi = swaggerUiExpress;
```

No `src/server.ts`:

```typescript
import { specs, swaggerUi } from "./swagger";

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

```bash
npm install @prisma/client
npx prisma generate
```

### Erro: "ECONNREFUSED" ao conectar no banco

- Verificar se PostgreSQL está rodando
- Verificar DATABASE_URL no `.env`

```bash
# No Windows (PostgreSQL)
net start postgresql-x64-15

# No Mac
brew services start postgresql

# Testar conexão
psql -U postgres
```

### Erro: "Token inválido"

- Verificar se JWT_SECRET é igual no frontend e backend
- Verificar se token foi enviado no header

```bash
# Verificar header Authorization
curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3333/api/contatos
```

### Porta 3333 já em uso

```bash
# Encontrar processo na porta
netstat -ano | findstr :3333

# Matar processo
taskkill /PID <PID> /F

# Ou usar porta diferente
PORT=3334 npm run dev
```

---

## ✅ Checklist Final

- [ ] Node.js v18+ instalado
- [ ] PostgreSQL instalado e rodando
- [ ] `.env` criado com DATABASE_URL
- [ ] `npm install` executado
- [ ] `npx prisma migrate dev --name init` executado
- [ ] `npm run db:seed` executado
- [ ] `npm run dev` rodando sem erros
- [ ] `curl http://localhost:3333/api/health` retorna status OK
- [ ] Login funciona com paciente@example.com / senha123
- [ ] Frontend conecta em `http://localhost:3333/api`
- [ ] Todas as rotas testadas no Postman
- [ ] Banco de dados visível no Prisma Studio

---

## 📚 Documentos Relacionados

- [`BACKEND_SETUP.md`](./BACKEND_SETUP.md) - Setup básico (legado)
- [`TROUBLESHOOTING_NETWORK.md`](./TROUBLESHOOTING_NETWORK.md) - Troubleshooting de conexão
- [`PAYMENTS_GUIDE.md`](./PAYMENTS_GUIDE.md) - Guia de pagamentos
- [`CONTACT_GUIDE.md`](./CONTACT_GUIDE.md) - Guia de contatos

---

## 🚀 Próximos Passos

1. **Banco de Dados Real**: Migrar dados para PostgreSQL em produção
2. **Webhooks**: Integrar Pix webhooks para confirmação de pagamento
3. **Upload de Imagens**: Implementar S3/Cloudinary para avatares
4. **Notificações**: Integrar Firebase Cloud Messaging
5. **Cache**: Adicionar Redis para performance
6. **Monitoramento**: Sentry para error tracking
7. **Tests**: Adicionar Jest para testes unitários

---

**Backend pronto para produção! 🚀🏥**

Dúvidas? Consulte a [Documentação do Prisma](https://www.prisma.io/docs/) ou [Express Docs](https://expressjs.com/).
