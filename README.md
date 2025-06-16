# TPPE_Estacionamento

Sistema de gerenciamento de estacionamento com API em FastAPI, banco de dados PostgreSQL e interface web em React.

## Repositório anterior
[Trabalho de OO](https://github.com/ItaloBrunoM/OO_trabalho)

## Outros Repositórios
[Backend](https://github.com/ItaloBrunoM/tppe-estacionamento-backend)
[Frontend](https://github.com/ItaloBrunoM/tppe-estacionamento-front)
[Database](https://github.com/ItaloBrunoM/tppe-estacionamento-database)

---

## Diagrama UML de classe do projeto

<div align='center'>
<p>Diagrama UML de Classes:</p>
<img src='docs/assets/Diagrama de Classe.jpg'></img>
</div>

## Diagrama Fisico do banco de dados

<div align='center'>
<p>Diagrama UML de Classes:</p>
<img src='docs/assets/DiagramaFisico.png'></img>
</div>

## Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Make

---

## Como executar o projeto

1. **Clone o repositório**  
   ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GERAL>
    cd <nome-da-pasta-clonada>

2. **Configure o Ambiente**

    ```bash
    make setup

3. **Inicie a Aplicação**

    ```bash
    make up

4. **Acessando a Aplicação**

* Frontend: http://localhost:3000
* Backend (API): http://localhost:8000

**Comandos Adicionais**

* make down: Para todos os serviços.
* make logs: Mostra os logs do backend em tempo real.
* make clean: Apaga a pasta workspace com os repositórios clonados.
* make help: Mostra todos os comandos disponíveis.*