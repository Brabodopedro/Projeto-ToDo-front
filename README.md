# Task Manager Frontend (React + Vite)

Frontend para o sistema de tarefas com autenticação JWT e consumo da API Laravel.

## 🚀 Tecnologias

- React 18 + Vite
- React Router DOM
- Axios
- JWT (localStorage)
- Validações manuais
- Consumo dinâmico da API

---

## 📁 Estrutura

```
src/
├── components/
│   ├── ProtectedRoute.jsx
│   └── TaskCard.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── TaskList.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── utils/
    └── auth.js
```

---

## 🧠 Funcionalidades

- Tela de login com validação
- Armazenamento de token JWT
- Rotas protegidas (`ProtectedRoute`)
- Listagem de tarefas do usuário
- Criação de nova tarefa (formulário)
- Redirecionamento após login
- Logout automático com expiração

---

## 🔐 Autenticação

- Login salva o token no `localStorage`
- Todas as requisições autenticadas usam:

```js
headers: {
  Authorization: `Bearer ${token}`
}
```

- O token é verificado em `ProtectedRoute.jsx`

---

## 📌 Páginas

- `/login` — Tela de login
- `/` — Página principal com listagem de tarefas

---

## 🔁 Requisições

| Método | Endpoint       | Descrição                  |
|--------|----------------|----------------------------|
| POST   | `/api/login`   | Login do usuário           |
| GET    | `/api/tasks`   | Listar tarefas             |
| POST   | `/api/tasks`   | Criar nova tarefa          |
| PUT    | `/api/tasks/id`| Atualizar tarefa existente |
| DELETE | `/api/tasks/id`| Excluir tarefa             |

---

## ▶️ Executar o projeto

```bash
git clone https://github.com/seu-usuario/task-manager-frontend.git
cd task-manager-frontend
npm install
npm run dev
```

---

## 🌐 Conexão com a API

Arquivo: `src/services/api.js`

```js
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
```

---

## 📌 Observações

- Vite com suporte rápido a hot reload
- Arquitetura simples e funcional
- Utilização de componentes reutilizáveis