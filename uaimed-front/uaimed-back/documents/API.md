# API Overview

Base URL: http://localhost:3333/api

Endpoints (scaffold):

- POST /api/usuarios -> Signup
- POST /api/sessions -> Signin
- POST /api/contatos -> Create contact (auth)
- GET /api/contatos -> List contacts (auth)
- POST /api/cupons/validar -> Validate coupon
- POST /api/pagamentos -> Process payment (auth)
- POST /api/avaliacoes -> Create review
- GET /api/avaliacoes/medico/:id/media -> Get average rating

Use o header `Authorization: Bearer <token>` para rotas que exigem autenticação.
