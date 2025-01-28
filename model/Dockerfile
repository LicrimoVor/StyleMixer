FROM python:3.12.1-slim

RUN mkdir /model
WORKDIR /model

COPY . .
RUN pip3 install -r ./requirements.txt --no-cache-dir

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8080"]
