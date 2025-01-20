from typing import Any
from typing_extensions import Annotated
import os

from fastapi import Depends, HTTPException
from sqlalchemy import Column, Integer, create_engine, inspect
from sqlalchemy.orm import declarative_base, declared_attr, sessionmaker, Session
from sqlalchemy_file.storage import StorageManager
from libcloud.storage.drivers.local import LocalStorageDriver

from settings import DATABASE_URL


def limit_str(val: Any, limit: int) -> str:
    """Ограничивает строку."""

    if isinstance(val, str) or getattr(val, "__repr__"):
        if len(str(val)) > limit:
            return str(val)[:limit] + "..."
        else:
            return str(val)
    return "..."


class MetaBase:
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    id = Column(Integer, primary_key=True)

    def __repr__(self) -> str:
        values = [
            f"{c.key}={limit_str(getattr(self, c.key), 8)}"
            for c in inspect(self).mapper.column_attrs
        ]
        text = ", ".join(values)
        return f"{self.__tablename__}({text})"


Base = declarative_base(cls=MetaBase)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(engine)

os.makedirs("./storage/images", 0o777, exist_ok=True)
container = LocalStorageDriver("./storage").get_container("images")
StorageManager.add_storage("default", container)


def get_session():
    with SessionLocal() as session:
        try:
            yield session
        except HTTPException as e:
            raise e


SessionDep = Annotated[Session, Depends(get_session)]
