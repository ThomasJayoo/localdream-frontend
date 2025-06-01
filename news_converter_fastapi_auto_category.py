
import json
import re
from fastapi import FastAPI
from datetime import datetime, timedelta

app = FastAPI()

@app.post("/api/news/save")
def convert_news():
    try:
        with open("notice_links_all.json", "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        return {"error": "notice_links_all.json 파일이 없습니다."}

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

    temp_store = {cat: [] for cat in category_keywords}

    for region, items in data.items():
        for item in items:
            title = item.get("title") or item.get("text", "")
            url = item.get("url", "")
            date_str = item.get("date", "")

            try:
                date_obj = datetime.strptime(date_str[:10], "%Y-%m-%d")
            except:
                continue
            if date_obj < one_week_ago:
                continue

            # 1. 카테고리 필드 또는 제목에서 추출
            category = item.get("category", "")
            if not category:
                match = re.search(r"\[(.*?)\]", title)
                category = match.group(1) if match else ""

            # 2. 카테고리 키워드 매칭
            matched_cat = None
            for cat, keywords in category_keywords.items():
                if any(kw in title for kw in keywords) or cat == category:
                    matched_cat = cat
                    break

            if matched_cat:
                temp_store[matched_cat].append({
                    "local": region,
                    "title": title,
                    "url": url,
                    "date": date_str
                })

    for cat, items in temp_store.items():
        items.sort(key=lambda x: x["date"], reverse=True)
        seen_locals = set()
        unique_items = []
        for item in items:
            if item["local"] not in seen_locals:
                unique_items.append(item)
                seen_locals.add(item["local"])
            if len(unique_items) >= 5:
                break
        if unique_items:
            categorized[cat] = unique_items

    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(categorized, f, ensure_ascii=False, indent=2)

    return {"message": "news.json 생성 완료", "count": sum(len(v) for v in categorized.values())}
