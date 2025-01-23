from fastapi import Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from models.user import User
from core.consts import COOKIE_ANONYMUS_SESSIONKEY


def get_user(request: Request, session: Session):
    if not (token := request.cookies.get(COOKIE_ANONYMUS_SESSIONKEY)):
        return None
    statement = select(User).where(User.token == token)
    user = session.scalar(statement)
    return user
