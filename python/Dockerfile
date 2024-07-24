FROM python:3.12

COPY ./src/*.py /src/
COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["/app/flask_server.py"]
