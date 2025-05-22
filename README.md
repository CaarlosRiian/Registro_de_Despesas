# 💰 Gerenciador de Despesas - Arquitetura MVC
**Tecnologia em Análise e Desenvolvimento de Sistemas**
**Instituto Federal do Rio Grande do Norte - IFRN**
**Disciplina:** Arquitetura de Software - 2025.1
**Professor:** Raphael Muniz

![image](https://github.com/user-attachments/assets/54e1733a-d0cb-4244-9641-b8ce5ac2c649)

## 📑 Descrição da Atividade
Atividade Prática 01 — Arquitetura MVC

Implementação de uma aplicação web com a arquitetura MVC (Model-View-Controller), onde a visão é uma SPA (Single Page Application) desenvolvida em React.

A proposta consiste na criação de um Gerenciador de Despesas, permitindo que os usuários realizem operações de CRUD (Create, Read, Update, Delete) sobre suas despesas.

## 🏗️ Arquitetura do Sistema

Frontend (React + Vite) ←→ API REST (Django Rest Framework) ←→ Banco de Dados (SQLite)

## 🧠 Funcionalidades
- ✅ Adicionar despesas
- ✅ Listar despesas
- ✅ Editar despesas
- ✅ Excluir despesas
- ✅ Interface moderna e responsiva com React

## 🗄️ Banco de Dados
- ✔️ Utiliza SQLite para persistência dos dados.
- ✔️ Gerenciamento via migrations do Django.

## 🚀 Como Executar o Projeto

### 🔧 Backend (Django + DRF)

```bash
cd backend
python -m venv venv
# Ativar no Windows:
venv\Scripts\activate
# Ativar no Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt

# Aplicar migrations
python manage.py migrate

# Executar o servidor
python manage.py runserver

```

## 🌐 Frontend (React + Vite)
```bash

cd frontend
npm install

# Executar o servidor de desenvolvimento
npm run dev 
```

## 👨‍🏫 Créditos
Projeto desenvolvido como parte da atividade prática da disciplina Arquitetura de Software (2024.1) do curso de Tecnologia em Análise e Desenvolvimento de Sistemas - IFRN.

Professor: Raphael Muniz
Turma: ADS 2025.1
