import json
from collections import defaultdict
from datetime import datetime

# 입력 파일 경로
input_file = "notice_links_all.json"
output_file = "news.json"

# 기본 변환 로직
def convert_to_news_json():
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            notices = json.load(f)
    except FileNotFoundError:
        print(f"파일이 존재하지 않습니다: {input_file}")
        return

    news_data = defaultdict(list)

    for item in notices:
        category = item.get("category", "기타")
        news_data[category].append({
            "local": item.get("local", ""),
            "title": item.get("title", ""),
            "url": item.get("url", ""),
            "date": item.get("date", datetime.now().strftime("%Y-%m-%d"))
        })

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)

    print(f"✅ 변환 완료: {output_file}")

if __name__ == "__main__":
    convert_to_news_json()