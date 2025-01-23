FROM python:3.12.1-slim

RUN mkdir /backend
WORKDIR /backend

COPY . .
RUN pip3 install -r ./requirements.txt --no-cache-dir

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
