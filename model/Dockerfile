FROM python:3.12.1-slim

RUN mkdir /model
WORKDIR /model

COPY . .

RUN pip3 install -r ./requirements.txt --no-cache-dir
RUN pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cpu

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081"]
