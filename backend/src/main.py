from fastapi import FastAPI
from sqlalchemy import create_engine

app = FastAPI()

# Conexão com o PostgreSQL
DATABASE_URL = "postgresql://estacionamento:senha_segura@db:5432/estacionamento_db"
engine = create_engine(DATABASE_URL)

@app.get("/")
def read_root():
    return {"Salve salve"}