#! /bin/bash
gunicorn -k uvicorn.workers.UvicornWorker \
 --access-logfile ./gunicorn-access.log main:app \
 --bind unix:/tmp/fastapi.sock \
 --workers 2 \
 --timeout 60 \
 --access-logfile ./logs/gunicorn-access.log \
 --log-config ./logs/uvicorn_log.ini \
 --daemon
# -k uvicorn.workers.UvicornWorker: Use the Uvicorn worker class.
# -access-logfile ./gunicorn-access.log: Record Gunicorn logs to the specified log file.
# main:app: Run the app from main.py.
# -bind 0.0.0.0:8000: Bind the server to port 8000 on all available network interfaces.
# -workers 2: Set the number of worker processes; it's typically set as twice the number of CPU cores.
# -daemon: Run Gunicorn in the background.
# -timeout 60: Set the timeout for worker processes to 60 seconds.
# -log-config ./logs/uvicorn_log.ini: Set the log configuration file.
# -access-logfile ./logs/gunicorn-access.log: Record Gunicorn logs to the specified log file.
