@echo off
cd /d %~dp0
echo 🔄 공지사항 크롤링 시작...
python selenium_notice_crawler_with_date.py
echo ✅ 크롤링 완료

echo 🔄 뉴스 변환 시작...
python convert_notice_to_news.py
echo ✅ news.json 생성 완료

pause
