BACKEND_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-backend.git
FRONTEND_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-front.git
DATABASE_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-database.git

BACKEND_DIR := $(WORKSPACE_DIR)/tppe-backend
FRONTEND_DIR := $(WORKSPACE_DIR)/tppe-frontend
DATABASE_DIR := $(WORKSPACE_DIR)/tppe-database

.PHONY: help setup up down logs clean

help: ## Mostra esta mensagem de ajuda
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Cria o .env, a pasta 'workspace' e clona todos os repositórios (multiplataforma)
	@echo "--- Criando arquivo de ambiente .env padrão..."
	@echo DB_USER=admin > .env
	@echo DB_PASSWORD=admin123 >> .env
	@echo DB_NAME=estacionamento >> .env
	@echo "--- Criando diretório de trabalho: workspace..."
ifeq ($(OS),Windows_NT)
	@if not exist workspace mkdir workspace
	@echo "--- Clonando repositório do Backend..."
	git clone $(BACKEND_REPO_URL) workspace\tppe-backend
	@echo "--- Clonando repositório do Frontend..."
	git clone $(FRONTEND_REPO_URL) workspace\tppe-frontend
	@echo "--- Clonando repositório do Banco de Dados..."
	git clone $(DATABASE_REPO_URL) workspace\tppe-database
else
	@mkdir -p workspace
	@echo "--- Clonando repositório do Backend..."
	git clone $(BACKEND_REPO_URL) workspace/tppe-backend
	@echo "--- Clonando repositório do Frontend..."
	git clone $(FRONTEND_REPO_URL) workspace/tppe-frontend
	@echo "--- Clonando repositório do Banco de Dados..."
	git clone $(DATABASE_REPO_URL) workspace/tppe-database
endif
	@echo "--- Setup completo! Execute 'make up' para iniciar os serviços."

up: ## Inicia todos os serviços com Docker Compose
	@echo "--- Iniciando todos os contêineres..."
	docker-compose up --build -d

down: ## Para todos os serviços
	@echo "--- Parando todos os contêineres..."
	docker-compose down

remove:
	@echo "--- Remover os contêineres e os volumes"
	docker-compose down -v

logs: ## Mostra os logs do backend em tempo real
	@echo "--- Mostrando logs do backend (pressione Ctrl+C para sair)..."
	docker-compose logs -f backend

clean: ## Remove a pasta 'workspace' e o arquivo .env (multiplataforma)
	@echo "--- Removendo diretório de trabalho e .env..."
ifeq ($(OS),Windows_NT)
	@if exist workspace rmdir /s /q workspace
	@if exist .env del .env
else
	@rm -rf workspace
	@rm -f .env
endif
	@echo "--- Limpeza completa."
