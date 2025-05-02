from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CarroCreate(BaseModel):
    placa: str
    modelo: str
    cor: Optional[str] = None
    vaga_id: int

class CarroResponse(BaseModel):
    id: int
    placa: str
    modelo: str
    cor: Optional[str]
    vaga_id: int
    hora_entrada: datetime
    hora_saida: Optional[datetime] = None

    