from fastapi import FastAPI
from src.routes.carros import router as carros_router

app= FastAPI()
app.include_router(carros_router, prefix="/api")

@app.get("/")
def read_root():
    return{"message": "Sistema de Estacionamento"}