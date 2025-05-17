@echo off
cd /d %~dp0

REM Step 1: FastAPI 서버 실행 (백그라운드)
start "" uvicorn news_converter_fastapi:app --host 127.0.0.1 --port 8000 --reload

REM Step 2: 5초 대기 (서버 뜰 시간 확보)
timeout /t 5 /nobreak > nul

REM Step 3: curl 요청으로 news.json 생성
curl -X POST http://127.0.0.1:8000/api/news/save

pause