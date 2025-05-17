@echo off
cd /d %~dp0

REM Step 1: FastAPI 서버 실행
start "" uvicorn news_converter_fastapi_notice_links_all:app --reload

REM Step 2: 서버 대기 (5초)
timeout /t 5 /nobreak > nul

REM Step 3: news.json 생성 요청
curl -X POST http://127.0.0.1:8000/api/news/save

REM Step 4: news.json 파일을 public 폴더로 복사
copy /Y news.json public\news.json

REM Step 5: Git add, commit, push
git add public\news.json
git commit -m "Auto: 최신 뉴스 반영 (news.json)"
git push origin main

pause