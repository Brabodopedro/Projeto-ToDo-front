# Projeto ToDo - Frontend (React)

Este repositório contém a interface web do sistema de tarefas, feita com React, Vite e autenticação via JWT.

---

## ⚙️ Tecnologias e Ferramentas

- React + TypeScript
- Vite
- CSS Modules
- React Router DOM
- JWT
- Axios
- Docker + Nginx

---

## 🚀 Como Rodar com Docker

1. Crie uma pasta No computador;
2. Clone este repositório e o back-end (`Projeto-ToDo-back`).
3. Na pasta criado, mova arquivo o dentro do back `docker-compose.yml`.
4. Execute:

```bash
docker compose up --build
```

4. Acesse o front-end em:  
```
http://localhost:3000
```

---

## 🧭 Rotas da Aplicação

| Rota           | Protegida | Descrição                |
|----------------|-----------|--------------------------|
| `/`            | ❌         | Página pública (Home)    |
| `/login`       | ❌         | Tela de login            |
| `/dashboard`   | ✅         | Lista e edição de tarefas|
| `/account`     | ✅         | Página da conta/logado   |

---

## 🎨 Layout

- Menu superior nas páginas protegidas (`/dashboard`, `/account`)
- Responsivo e com UX simples
- Proteção de rotas com componente `ProtectedRoute`

---

## ✅ Funcionalidades

- Autenticação com JWT
- Formulário de login com validação
- Listagem de tarefas do usuário autenticado
- Criação e edição inline
- Logout

---

## 🔐 Integração com a API

As chamadas são feitas para:  
```
http://localhost:8000/api
```

Requer header:

```
Authorization: Bearer <TOKEN>
```

---

## 📄 Licença

MIT