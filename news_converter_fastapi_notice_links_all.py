from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/news/save")
def convert_news():
    try:
        with open("notice_links_all_with_category.json", "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        return {"error": "notice_links_all_with_category.json 파일이 없습니다."}

    today = datetime.today()
    one_week_ago = today - timedelta(days=7)

    categorized = {}

    category_keywords = {
        "복지": ["복지", "노인", "어르신", "출산", "장애", "청소년"],
        "축제": ["축제", "행사", "공연", "문화"],
        "관광홍보": ["관광", "홍보", "유치", "명소"],
        "건설행정": ["공사", "건설", "도로", "행정"],
        "커뮤니티뉴스": ["공지", "알림", "소식", "뉴스", "게시"],
        "인구대책": ["인구", "청년", "귀농", "이주", "전입"]
    }

    for region, items in data.items():
        for item in items:
            date_str = item.get("date", "")
            try:
                date_obj = datetime.strptime(date_str[:10], "%Y-%m-%d")
            except:
                continue

            if date_obj < one_week_ago:
                continue

            title = item.get("title", "")
            url = item.get("url", "")
            category = item.get("category", "")

            matched = False
            for cat, keywords in category_keywords.items():
                if any(kw in title for kw in keywords) or cat == category:
                    categorized.setdefault(cat, []).append({
                        "local": region,
                        "title": title,
                        "url": url,
                        "date": date_str
                    })
                    matched = True
                    break

            if not matched:
                categorized.setdefault("기타", []).append({
                    "local": region,
                    "title": title,
                    "url": url,
                    "date": date_str
                })

    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(categorized, f, ensure_ascii=False, indent=2)

    return {"message": "news.json 생성 완료", "count": sum(len(v) for v in categorized.values())}