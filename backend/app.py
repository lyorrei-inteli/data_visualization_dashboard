import io
import logging
from uuid import uuid4

import pandas as pd
from database.prisma import Prisma, db, get_db
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from middleware.auth import get_current_user
from models.prediction import InputData, MultiOutputData, Prediction
from models.user import SystemUser, TokenSchema, UserResponse, UserAuth, UserOut
from pycaret.classification import load_model
from services.prediction import make_prediction
from utils.auth import (create_access_token, get_hashed_password,
                        verify_password)

load_dotenv()

logging.basicConfig(level=logging.ERROR)

# Carregando o modelo salvo com PyCaret
model = load_model("./ai/final_model")

app = FastAPI(
    title="Modelo de Previsão",
    description="Um API simples para fazer previsões usando um modelo treinado com PyCaret.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the domains you want to allow here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        "name": data.name,
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
    print(user)
    user_response = UserResponse.from_orm(user)

    return {
        "user": user_response,
        "access_token": create_access_token(user.email),
    }


@app.get(
    "/me", summary="Get details of currently logged in user", response_model=UserOut
)
async def get_me(
    db: Prisma = Depends(get_db), user: SystemUser = Depends(get_current_user)
):
    return user


@app.get("/predictions", response_model=list[Prediction])
async def get_predictions(
    db: Prisma = Depends(get_db), user: SystemUser = Depends(get_current_user)
):
    predictions = await db.prediction.find_many(include={"PredictionInfo": True})
    print(predictions)
    return predictions


@app.post("/predictions/create", response_model=MultiOutputData)
async def predict(
    file: UploadFile = File(...),
    db: Prisma = Depends(get_db),
    user: SystemUser = Depends(get_current_user),
):
    try:
        # Read the CSV content
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        results = []

        for _, row in df.iterrows():
            data_dict = row.to_dict()
            data = InputData(**data_dict)

            prediction_result = make_prediction(data.dict(), model)
            single_result = prediction_result["prediction_label"].iloc[0]

            async with db.tx() as transaction:
                new_prediction = await transaction.prediction.create(
                    data={
                        "result": int(single_result),
                        "authorId": str(user.id),
                        "name": data.name,
                    }
                )
                del data.name
                await transaction.predictioninfo.create(
                    data={**data.dict(), "predictionId": new_prediction.id}
                )

            results.append(
                {
                    "prediction": single_result,
                    "result": "Acidente severo"
                    if single_result == 1
                    else "Acidente não severo",
                }
            )

        return {"predictions": results}

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=3001)
