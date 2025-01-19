from typing import Any


def form_to_dict(value: Any) -> Any:
    """Преобразует form-data в словарь (если это возможно)."""
    try:
        return eval(value)
    except Exception:
        return value
