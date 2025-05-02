from fastapi import APIRouter, HTTPException, status
from src.models.carros import CarroCreate, CarroResponse
import asyncpg
import os

router = APIRouter()

@router.post("/carros", response_model=CarroResponse)
async def estacionar_carro(carro: CarroCreate):
    conn = None
    try:
        conn = await asyncpg.connect(user=os.getenv("DB_USER"),
                                      password=os.getenv("DB_PASSWORD"),
                                      database=os.getenv("DB_NAME"),
                                      host="db")
        # Verificando se a vaga está disponível
        vaga_exists = await conn.fetchval("SELECT disponivel FROM vagas WHERE id = $1", carro.vaga_id)

        if not vaga_exists:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vaga não encontrada ou não disponível")

        # Inserindo o carro no banco de dados
        carro_db = await conn.fetchrow(
            """
            INSERT INTO carros (placa, modelo, cor, vaga_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, placa, modelo, cor, hora_entrada, hora_saida, vaga_id
            """,
            carro.placa, carro.modelo, carro.cor, carro.vaga_id  # Passando os dados diretamente
        )

        return dict(carro_db)

    except asyncpg.exceptions.UniqueViolationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Placa já cadastrada.")
    except asyncpg.exceptions.ForeignKeyViolationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Vaga não existe.")
    except asyncpg.exceptions.DataError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erro nos dados fornecidos.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro inesperado: {str(e)}")
    finally:
        if conn:
            await conn.close()