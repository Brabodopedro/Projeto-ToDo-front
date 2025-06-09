# Projeto ToDo - Frontend (React)

Este repositório contém a interface web do sistema de tarefas, feita com React, Vite e autenticação via JWT.

---

## ⚙️ Tecnologias

- React + TypeScript
- Vite
- CSS Modules
- React Router DOM
- JWT
- Axios
- Docker

---

## 🚀 COMO RODAR JUNTO COM O BACKEND

> ⚠️ O `docker-compose.yml` está no repositório `Projeto-ToDo-back`, e ele já configura o container do front.

1. Clone **este repositório** como `Projeto-ToDo-front` e o repositório do back-end(`https://github.com/Brabodopedro/Projeto-ToDo-back`) lado a lado na mesma estrutura:
```
alguma-pasta/
├── Projeto-ToDo-back/
├── Projeto-ToDo-front/    <- Este repositório
```

2. Vá para a pasta `Projeto-ToDo-back` e rode:

```bash
docker compose up --build
```

3. Acesse o frontend em: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Integração com API

- API Base: `http://localhost:8000/api`
- Token JWT via `Authorization: Bearer <TOKEN>`

---

## ✅ Funcionalidades

- Login com JWT
- Listagem de tarefas
- Criação, edição, exclusão inline
- Logout e navegação protegida