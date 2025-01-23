from uuid import uuid4
from fastapi import APIRouter, Response, Request
from sqlalchemy import select

from core.database import SessionDep
from core.consts import COOKIE_ANONYMUS_SESSIONKEY, MAX_AGE_TOKEN
from models.user import User


user_router = APIRouter(prefix="/user")


@user_router.get("")
async def profile(request: Request, session: SessionDep):
    if token := request.cookies.get(COOKIE_ANONYMUS_SESSIONKEY):
        statement = select(User).where(User.token == token)
        user = session.scalar(statement)
        if user is not None:
            return {"viability": str(user.viability).split(".")[0]}

    return Response(status_code=401)


@user_router.post("/reg")
async def register(response: Response, request: Request, session: SessionDep):
    if token := request.cookies.get(COOKIE_ANONYMUS_SESSIONKEY):
        statement = select(User).where(User.token == token)
        user = session.scalar(statement)
        if user is not None:
            return Response(status_code=200)

    token = str(uuid4())
    user = User(token=token)
    session.add(user)
    session.commit()
    response.set_cookie(
        key=COOKIE_ANONYMUS_SESSIONKEY,
        value=token,
        secure=True,
        max_age=MAX_AGE_TOKEN,
        samesite="none",
    )
    response.status_code = 201
    return response
