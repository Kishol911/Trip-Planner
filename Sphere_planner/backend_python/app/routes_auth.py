from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.database import db
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter()


class RegisterIn(BaseModel):
    name: str | None = None
    email: EmailStr
    password: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str


@router.post('/register')
def register(payload: RegisterIn):
    existing = db.users.find_one({'email': payload.email})
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    user_doc = {
        'name': payload.name,
        'email': payload.email,
        'password_hash': hash_password(payload.password),
        'createdAt': datetime.utcnow()
    }
    result = db.users.insert_one(user_doc)
    return {'id': str(result.inserted_id), 'email': payload.email, 'name': payload.name}


@router.post('/login')
def login(payload: LoginIn):
    user = db.users.find_one({'email': payload.email})
    if not user:
        raise HTTPException(status_code=400, detail='Invalid credentials')
    if not verify_password(payload.password, user.get('password_hash', '')):
        raise HTTPException(status_code=400, detail='Invalid credentials')
    token = create_access_token({'sub': str(user['_id']), 'email': user['email']})
    return {'access_token': token, 'token_type': 'bearer'}
