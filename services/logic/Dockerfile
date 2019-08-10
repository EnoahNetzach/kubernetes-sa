FROM python:3-alpine

WORKDIR /home/sa-logic

COPY requirements.txt /home/sa-logic/requirements.txt
COPY main.py /home/sa-logic/main.py

RUN python -m pip install -r requirements.txt && \
  python -m textblob.download_corpora

EXPOSE 5000

ENTRYPOINT ["python"]

CMD ["main.py"]
