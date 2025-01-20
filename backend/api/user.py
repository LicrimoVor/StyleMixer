from uuid import uuid4
from fastapi import APIRouter, Response, Request
from sqlalchemy import select

from core.database import SessionDep
from core.consts import COOKIE_ANONYMUS_SESSIONKEY
from models.user import User


user_router = APIRouter(prefix="/user")
MAX_AGE_TOKEN = 30 * 24 * 3600


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
