from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import estacionamento as models

router = APIRouter(
    prefix="/api/estacionamentos",
    tags=["Estacionamentos"]
)

@router.post("/", response_model=models.Estacionamento, status_code=status.HTTP_201_CREATED)
def criar_estacionamento(estacionamento: models.EstacionamentoCreate, db: Session = Depends(get_db)):
    """
    Cria um novo estacionamento no banco de dados.
    """
    db_estacionamento = models.EstacionamentoDB(**estacionamento.model_dump())
    db.add(db_estacionamento)
    db.commit()
    db.refresh(db_estacionamento)
    return db_estacionamento

@router.get("/", response_model=List[models.Estacionamento])
def listar_estacionamentos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Lista todos os estacionamentos cadastrados.
    """
    estacionamentos = db.query(models.EstacionamentoDB).offset(skip).limit(limit).all()
    return estacionamentos
