from pydantic import BaseModel, EmailStr

class UserAuth(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    email: EmailStr
    password: str
    id: str

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

