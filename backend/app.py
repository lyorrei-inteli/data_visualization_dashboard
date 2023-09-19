import logging
from uuid import uuid4

from models.user import TokenSchema, UserAuth, UserOut, SystemUser
from utils.auth import create_access_token, get_hashed_password, verify_password
from models.prediction import InputData, OutputData
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from pycaret.classification import load_model
from services.prediction import make_prediction
from middleware.auth import get_current_user
from database.prisma import db, get_db, Prisma
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.ERROR)

# Carregando o modelo salvo com PyCaret
model = load_model("./ai/final_model")

app = FastAPI(
    title="Modelo de Previsão",
    description="Um API simples para fazer previsões usando um modelo treinado com PyCaret.",
    version="1.0.0",
)


@app.post("/signup", summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth, db: Prisma = Depends(get_db)):
    # querying database to check if user already exist
    user = await db.user.find_unique(where={"email": data.email})
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist",
        )
    user = {
        "email": data.email,
        "password": get_hashed_password(data.password),
        "id": str(uuid4()),
    }
    await db.user.create(data={**user})
    return user


@app.post(
    "/login",
    summary="Create access and refresh tokens for user",
    response_model=TokenSchema,
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Prisma = Depends(get_db)
):
    user = await db.user.find_first(where={"email": form_data.username})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    hashed_pass = user.password
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    return {
        "access_token": create_access_token(user.email),
    }


@app.get(
    "/me", summary="Get details of currently logged in user", response_model=UserOut
)
async def get_me(
    db: Prisma = Depends(get_db), user: SystemUser = Depends(get_current_user)
):
    return user


@app.post("/predict/", response_model=OutputData)
async def predict(
    data: InputData,
    db: Prisma = Depends(get_db),
    user: SystemUser = Depends(get_current_user),
):
    try:
        prediction_result = make_prediction(data.dict(), model)
        result = prediction_result["prediction_label"].iloc[0]
        return {
            "prediction": result,
            "result": "Acidente severo" if result == 1 else "Acidente não severo",
        }
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
