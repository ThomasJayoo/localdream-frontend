@echo off
REM FastAPI 서버가 실행 중이어야 함

echo [INFO] news.json 자동 생성 요청 시작...
curl -X POST http://127.0.0.1:8000/api/news/save
echo [DONE] news.json 자동 생성 완료
pause
