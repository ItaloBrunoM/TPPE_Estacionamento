BACKEND_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-backend.git
FRONTEND_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-front.git
DATABASE_REPO_URL := https://github.com/ItaloBrunoM/tppe-estacionamento-database.git

WORKSPACE_DIR := workspace
BACKEND_DIR := $(WORKSPACE_DIR)/tppe-backend
FRONTEND_DIR := $(WORKSPACE_DIR)/tppe-frontend
DATABASE_DIR := $(WORKSPACE_DIR)/tppe-database

.PHONY: help setup up down remove logs clean

help: ## Mostra esta mensagem de ajuda
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Cria o .env, a pasta 'workspace' e clona todos os repositórios (multiplataforma)
	@echo "--- Criando arquivo de ambiente .env padrão..."
	@echo DB_USER=admin > .env
	@echo DB_PASSWORD=admin123 >> .env
	@echo DB_NAME=estacionamento >> .env
	@echo "--- Criando diretório de trabalho: workspace..."
ifeq ($(OS),Windows_NT)
	@if not exist $(WORKSPACE_DIR) mkdir $(WORKSPACE_DIR)
	@echo "--- Clonando repositório do Backend..."
	@git clone $(BACKEND_REPO_URL) $(WORKSPACE_DIR)\tppe-backend
	@if exist $(WORKSPACE_DIR)\tppe-backend ( \
		echo "--- Gerando .env no backend com conexão local Docker..." && \
		cd $(WORKSPACE_DIR)\tppe-backend && ( \
			echo DB_USER=admin > .env && \
			echo DB_PASSWORD=admin123 >> .env && \
			echo DB_NAME=estacionamento >> .env && \
			echo DB_HOST=db >> .env && \
			echo DB_PORT=5432 >> .env && \
			echo DATABASE_URL=postgresql://admin:admin123@db:5432/estacionamento >> .env \
		) \
	) else ( \
		echo Erro: diretório do backend não encontrado. Clone falhou? && exit 1 \
	)
	@echo "--- Clonando repositório do Frontend..."
	@git clone $(FRONTEND_REPO_URL) $(WORKSPACE_DIR)\tppe-frontend
	@if not exist $(WORKSPACE_DIR)\tppe-frontend ( \
		echo Erro: diretório do frontend não encontrado. Clone falhou? && exit 1 \
	)
	@echo "--- Clonando repositório do Banco de Dados..."
	@git clone $(DATABASE_REPO_URL) $(WORKSPACE_DIR)\tppe-database
	@if not exist $(WORKSPACE_DIR)\tppe-database ( \
		echo Erro: diretório do database não encontrado. Clone falhou? && exit 1 \
	)
else
	@mkdir -p $(WORKSPACE_DIR)
	@echo "--- Clonando repositório do Backend..."
	@git clone $(BACKEND_REPO_URL) $(BACKEND_DIR)
	@if [ -d "$(BACKEND_DIR)" ]; then \
		echo "--- Gerando .env no backend com conexão local Docker..."; \
		cd $(BACKEND_DIR) && ( \
			echo DB_USER=admin > .env && \
			echo DB_PASSWORD=admin123 >> .env && \
			echo DB_NAME=estacionamento >> .env && \
			echo DB_HOST=db >> .env && \
			echo DB_PORT=5432 >> .env && \
			echo DATABASE_URL=postgresql://admin:admin123@db:5432/estacionamento >> .env \
		); \
	else \
		echo "Erro: diretório do backend não encontrado. Clone falhou?"; exit 1; \
	fi
	@echo "--- Clonando repositório do Frontend..."
	@git clone $(FRONTEND_REPO_URL) $(FRONTEND_DIR)
	@if [ ! -d "$(FRONTEND_DIR)" ]; then \
		echo "Erro: diretório do frontend não encontrado. Clone falhou?"; exit 1; \
	fi
	@echo "--- Clonando repositório do Banco de Dados..."
	@git clone $(DATABASE_REPO_URL) $(DATABASE_DIR)
	@if [ ! -d "$(DATABASE_DIR)" ]; then \
		echo "Erro: diretório do database não encontrado. Clone falhou?"; exit 1; \
	fi
endif
	@echo "--- Setup completo! Execute 'make up' para iniciar os serviços."

up: ## Inicia todos os serviços com Docker Compose
	@echo "--- Iniciando todos os contêineres..."
	docker-compose up --build -d

down: ## Para todos os serviços
	@echo "--- Parando todos os contêineres..."
	docker-compose down

remove: ## Remove contêineres e volumes
	@echo "--- Removendo os contêineres e volumes..."
	docker-compose down -v

logs: ## Mostra os logs do backend em tempo real
	@echo "--- Mostrando logs do backend (pressione Ctrl+C para sair)..."
	docker-compose logs -f backend

clean: ## Remove a pasta 'workspace' e o arquivo .env (multiplataforma)
	@echo "--- Removendo diretório de trabalho e .env..."
ifeq ($(OS),Windows_NT)
	@if exist $(WORKSPACE_DIR) rmdir /s /q $(WORKSPACE_DIR)
	@if exist .env del .env
else
	@rm -rf $(WORKSPACE_DIR)
	@rm -f .env
endif
	@echo "--- Limpeza completa."
