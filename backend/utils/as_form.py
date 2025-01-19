import inspect
from typing import Type, Annotated
from functools import wraps

from fastapi import Form
from pydantic import BaseModel


def as_form(cls: Type[BaseModel]):
    """Декоратор для классов с формами."""
    new_parameters = [
        inspect.Parameter(
            field_name,
            inspect.Parameter.POSITIONAL_ONLY,
            default=model_field.default,
            annotation=Annotated[model_field.annotation, *model_field.metadata, Form(...)],
        )
        for field_name, model_field in cls.model_fields.items()
    ]

    cls.__signature__ = cls.__signature__.replace(parameters=new_parameters)

    @wraps(cls)
    def wrapper(*args, **kwargs):
        return cls

    return wrapper
