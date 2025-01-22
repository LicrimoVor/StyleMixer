Создание файла миграций

```
alembic revision --autogenerate -m "Yours comment"
```

---

Просмотр последней миграции

```
alembic current
```
---

Выполнение всех не применённых миграций
```
alembic upgrade head
```
