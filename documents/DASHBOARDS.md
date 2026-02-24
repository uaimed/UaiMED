# Dashboards — projeto UaiMED

Este documento descreve os dashboards de Clínica e de Profissional (médico), contratos de API recomendados, observações de implementação e melhorias sugeridas.

## Objetivo

Transformar os dashboards de placeholder em painéis acionáveis com KPIs, gráficos e filtros para que clínicas e profissionais possam monitorar atividade, receita e performance.

## Endpoints existentes (resumo)

- `GET /api/admin/summary` — resumo para usuários com role `clinica`.
- `GET /api/professionals/me/summary` — resumo para profissional autenticado (`medico`).

Esses endpoints fornecem agregações básicas (contagens, soma de pagamentos, próximos agendamentos). Abaixo há uma versão expandida dos contratos recomendados.

## Contratos de API recomendados

1. Clinic summary (expandido)

- Endpoint: `GET /api/admin/summary`
- Query params opcionais: `from=YYYY-MM-DD`, `to=YYYY-MM-DD`, `especialidade`, `profissionalId`, `page`, `limit`
- Auth: Bearer token (role `clinica`)
- Response (exemplo):

```json
{
  "totalUsuarios": 1024,
  "totalAgendamentos": 240,
  "totalAgendamentosHoje": 12,
  "revenue": 12345.5,
  "revenueByDay": [{ "date": "2025-11-01", "value": 123.5 }],
  "agendamentosPorStatus": { "pendente": 10, "confirmado": 20, "cancelado": 5 },
  "topProfissionais": [
    {
      "profissionalId": "...",
      "nome": "Dr X",
      "especialidade": "Cardio",
      "agendamentosCount": 12,
      "revenue": 1200
    }
  ]
}
```

2. Professional summary (expandido)

- Endpoint: `GET /api/professionals/me/summary`
- Query params opcionais: `from`, `to`
- Auth: Bearer token (role `medico`)
- Response (exemplo):

```json
{
  "totalToday": 4,
  "nextAppointments": [
    { "id": "...", "dataHora": "2025-11-18T10:00:00Z", "pacienteNome": "João" }
  ],
  "revenueThisMonth": 1200.0,
  "averageRating": 4.6,
  "appointmentsByDay": [{ "date": "2025-11-01", "count": 3 }]
}
```

## Melhorias recomendadas (backend)

- Aceitar `from`/`to` para agregações e `limit`/`page` para listas.
- Indexes no banco: `agendamentos(dataHora)`, `agendamentos(profissionalId)`, `pagamentos(agendamentoId)`.
- Endpoints paginados para listas longas (ex.: `/api/admin/top-profissionais?page=1&limit=10`).
- Cache para queries pesadas (Redis ou cache in-memory com TTL curto) para reduzir carga de agregações.
- Validar e centralizar lógica de agregação em `services/` para reutilização e testes.

## Melhorias recomendadas (frontend)

- `ClinicDashboard`:

  - KPI cards: `Total Usuários`, `Agendamentos Hoje`, `Receita (período)`, `Média Avaliações`.
  - Gráficos: receita por dia (linha), agendamentos por status (pizza/bar).
  - Lista "Top Profissionais" com ação para ver perfil/agendamentos.
  - Filtros: período, especialidade, profissional.

- `MedicoDashboard`:
  - Próximos 5 agendamentos com ação de ir para detalhes.
  - KPIs: `Atendimentos Hoje`, `Receita Mês`, `Média Avaliações`.
  - Pequeno gráfico de carga semanal.

Componentes sugeridos: `KPICard`, `DateRangePicker`, `Chart` (usar `react-native-chart-kit` ou `victory-native`).

## Plano de implementação sugerido

1. Expandir endpoints no backend para aceitar parâmetros e devolver estruturas como as mostradas acima.
2. Criar endpoint paginado para top profissionais.
3. Implementar componentes básicos de UI no frontend e ligar aos endpoints (KPIs + um gráfico simples).
4. Adicionar cache (opcional, se houver necessidade de performance).

## Tarefas imediatas que posso executar

- Atualizar `admin.controller` e `professional.controller` para aceitar `from`/`to` e `limit`.
- Criar endpoint `GET /api/admin/top-profissionais` com paginação simples.
- Implementar rapidamente `KPICard` e um layout inicial para `ClinicDashboard` (frontend).

Quer que eu comece pelo backend ou prefira que faça protótipo visual primeiro?
