from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
from collections import defaultdict
from datetime import datetime
import os

app = FastAPI()

INPUT_FILE = "notice_links_all_with category.json"
OUTPUT_FILE = "news.json"

@app.post("/api/news/save")
def convert_news():
    if not os.path.exists(INPUT_FILE):
        return JSONResponse(status_code=404, content={"error": f"{INPUT_FILE} 파일이 없습니다."})

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        notices = json.load(f)

    news_data = defaultdict(list)
    for item in notices:
        category = item.get("category", "기타")
        news_data[category].append({
            "local": item.get("local", ""),
            "title": item.get("title", ""),
            "url": item.get("url", ""),
            "date": item.get("date", datetime.now().strftime("%Y-%m-%d"))
        })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)

    return {"message": f"{OUTPUT_FILE} 생성 완료", "count": sum(len(v) for v in news_data.values())}