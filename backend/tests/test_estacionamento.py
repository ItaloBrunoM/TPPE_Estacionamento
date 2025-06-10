from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.main import app
from src.database import get_db
from src.models.estacionamento import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_criar_estacionamento():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    response = client.post(
        "/api/estacionamentos/",
        json={"nome": "Estacionamento Teste Pytest", "total_vagas": 75}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["nome"] == "Estacionamento Teste Pytest"
    assert data["total_vagas"] == 75
    assert "id" in data

def test_listar_estacionamentos():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    client.post("/api/estacionamentos/", json={"nome": "Shopping A", "total_vagas": 150})
    response = client.get("/api/estacionamentos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["nome"] == "Shopping A"