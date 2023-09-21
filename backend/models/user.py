from uuid import UUID
from pydantic import BaseModel, Field

class UserResponse(BaseModel):
    id: str
    email: str
    name: str

    class Config:
        from_attributes = True

class TokenSchema(BaseModel):
    access_token: str
    user: UserResponse
    
    
class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None


class UserAuth(BaseModel):
    email: str = Field(..., description="user email")
    name: str = Field(..., description="user name")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    

class UserOut(BaseModel):
    id: UUID
    email: str


class SystemUser(UserOut):
    password: str