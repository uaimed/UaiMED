# UaiMED

Este repositório contém o projeto completo da plataforma UaiMED, dividido em duas partes:

- **backend** (`uaimed-back`) em Node.js/TypeScript com Express, Prisma e Postgres
- **frontend** (`uaimed-front`) em React Native TypeScript para mobile

> ⚠️ Este README está na raiz do projeto e aponta para os detalhes de cada subprojeto.

---

## 📁 Estrutura de diretórios

```
/uaimed-back   - servidor REST, testes e banco
/uaimed-front  - aplicativo móvel com navegação e UI
documents/     - documentação geral do projeto
.github/       - configurações de CI (GitHub Actions)
...            - outros arquivos de suporte como LICENSE, etc.
```

## 🚀 Backend

O backend cuida de autenticação, gerenciamento de médicos, agendamentos, pagamentos e
notificações. Algumas características e status:

- API REST com rotas para login, logout, cadastros, agendamentos, avaliações, contatos etc.
- Banco de dados PostgreSQL modelado com Prisma (existe `docker-compose.yml` para subir uma
  instância local).
- Middleware para autenticação JWT, controle de roles e tratamento de erros.
- Testes automáticos com [vitest](https://vitest.dev) cobrindo os principais endpoints.
- Ação de CI (`.github/workflows/ci.yml`) executa esses testes em push/PR.

### ✅ Funcionalidades implementadas

- CRUD de usuários (pacientes, profissionais e admins)
- Autenticação (login, senha criptografada, refresh tokens)
- Agendamentos com especialidades e horários
- Pagamentos (modelo básico) e geração de logs
- Envio de e‑mail de recuperação e notificações (em parte)

### 🛠️ Tarefas (TODO) para o backend

- [ ] Finalizar validações de pagamentos (`mesa` e `fato_pagamentos`)
- [ ] Implementar geração/renovação de refresh tokens no logout
- [ ] Acrescentar cobertura de testes para fluxos de erro e permissions
- [ ] Adicionar endpoints para relatórios/exportação de dados
- [ ] Configurar lint/format automático e pre‑commit hooks

> Consulte `uaimed-back/documents/` para detalhes de setup e outras instruções.

---

## 📱 Frontend

O aplicativo React Native fornece a interface para pacientes navegarem, fazerem agendamentos
e gerenciarem sua conta.

### 📋 Recursos atuais

- Autenticação com telas de login, cadastro, recuperação de senha e confirmação.
- Navegação com AuthStack e MainTabNavigation usando React Navigation.
- Tela inicial com busca de médicos, próximo agendamento e opções rápidas.
- Listagem de agendamentos futuros/anteriores e perfil do usuário.
- Pesquisa de especialidades (SearchScreen).
- Sistema completo de temas/estilos e hooks personalizados para chamadas de API.

### 📦 Estrutura e documentação

- Componentes organizados; muitas telas já codificadas com validações robustas.
- Documentos em `uaimed-front/documents/` explicam setup, design e troubleshooting.
- Scripts npm para rodar em emulador/dispositivo (`npm start`, `npm run android`, etc.).

### 🛠️ Tarefas (TODO) para o frontend

- [ ] Concluir telas de agendamento: resultados, detalhes do médico, seleção de horário,
      confirmação.
- [ ] Desenvolver componentes reutilizáveis (Button, Input, Card, Modal).
- [ ] Forçar logout no frontend quando token expirar (veja TODO no `uaiMedApi.ts`).
- [ ] Implementar integração com pagamentos e histórico de cobranças.
- [ ] Adicionar testes (Jest/React Native Testing Library) para componentes e hooks.
- [ ] Revisar acessibilidade e suporte a temas escuros.

> Leia `uaimed-front/ESTRUTURA_PROJETO.md` para ver o plano de arquivos e TODOs já
> listados.

---

## � Possíveis melhorias e integrações

- 📦 **Uso de SAP**: avaliar a integração com SAP (por exemplo SAP Business One ou SAP Fiori) para
  gerenciar inventário de equipamentos médicos, faturamento ou ERP completo, caso a
  plataforma cresça. Um conector via OData ou APIs REST pode ser ideal para sincronizar
  dados de pacientes e pagamentos com sistemas corporativos existentes.
- 🧠 Considere arquiteturas de microsserviços ou serverless para escalabilidade futura.
- ☁️ Planejar deploy em AWS/Azure/Google Cloud com containers ou funções.

## �🛠 Como rodar localmente

1. Clone o repositório e entre na pasta:
   ```bash
   git clone <url> uaimed
   cd uaimed
   ```
2. **Backend**
   ```bash
   cd uaimed-back
   npm ci
   docker-compose up -d    # inicia Postgres
   npm run dev             # servidor em localhost:3000
   ```
3. **Frontend** (dependendo de emulador/Expo)
   ```bash
   cd ../uaimed-front
   npm ci
   npm start               # inicia Metro/Expo
   ```
4. Ajuste `DATABASE_URL`/`BASE_URL` nos `.env` conforme necessário.

---

## 📄 Documentação adicional

- Veja `DOCUMENTACAO_PROJETO_UAIMED.md` no root para visão geral.
- Mantenha os documentos em `documents/` atualizados com decisões de arquitetura e
  instruções de deploy.

---

## 🧾 Licença

Coloque aqui a licença escolhida (por exemplo, `MIT`).

---

> Boa sorte com o desenvolvimento! Fique à vontade para editar e expandir este README à medida
> que o projeto evolui.
