from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
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

@router.delete("/{estacionamento_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_estacionamento(estacionamento_id: int, db: Session = Depends(get_db)):
    """
    Deleta um estacionamento específico pelo ID.
    """
    estacionamento = db.query(models.EstacionamentoDB).filter(models.EstacionamentoDB.id == estacionamento_id).first()
    if not estacionamento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Estacionamento não encontrado")
    db.delete(estacionamento)
    db.commit()
    return {"message": "Estacionamento deletado com sucesso"}

@router.put("/{estacionamento_id}", response_model=models.Estacionamento)
def atualizar_estacionamento(estacionamento_id: int, estacionamento_update: models.EstacionamentoCreate, db: Session = Depends(get_db)):
    """
    Atualiza um estacionamento existente pelo ID.
    """
    db_estacionamento = db.query(models.EstacionamentoDB).filter(models.EstacionamentoDB.id == estacionamento_id).first()
    if not db_estacionamento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Estacionamento não encontrado")
    for key, value in estacionamento_update.model_dump().items():
        setattr(db_estacionamento, key, value)
    db.add(db_estacionamento)
    db.commit()
    db.refresh(db_estacionamento)

    return db_estacionamento
