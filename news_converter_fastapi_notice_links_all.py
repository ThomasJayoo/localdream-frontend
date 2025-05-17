from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
from collections import defaultdict
from datetime import datetime
import os

app = FastAPI()

@app.post("/api/news/save")
def convert_news():
    input_file = "notice_links_all.json"
    output_file = "news.json"

    if not os.path.exists(input_file):
        return JSONResponse(status_code=404, content={"error": f"{input_file} 파일이 없습니다."})

    with open(input_file, "r", encoding="utf-8") as f:
        notices = json.load(f)

    news_data = defaultdict(list)
    for category, items in notices.items():
        sorted_items = sorted(items, key=lambda x: x.get("date", ""), reverse=True)
        news_data[category] = sorted_items

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)

    return {"message": f"{output_file} 생성 완료", "count": sum(len(v) for v in news_data.values())}
