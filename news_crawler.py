
import os
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# 크롤링 대상 시군 목록
regions = {
    "서울특별시 강남구": "https://news.gangnam.go.kr/",
    "전라남도 진도군": "https://jindo.go.kr/news/"
}

# 카테고리 기준 (예시)
CATEGORIES = ["커뮤니티뉴스", "복지", "축제", "관광홍보"]

# 실제 카테고리를 판단하는 로직은 HTML 구조에 따라 다름
def categorize(title):
    if "복지" in title:
        return "복지"
    elif "축제" in title:
        return "축제"
    elif "홍보" in title or "관광" in title:
        return "관광홍보"
    else:
        return "커뮤니티뉴스"

# 본문 크롤링 함수
def crawl_region(region_name, url):
    print(f"Crawling {region_name} from {url}")
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")

        # 뉴스 항목 파싱 예시 (사이트마다 구조 다름)
        items = soup.select("ul.news_list > li")  # ← 구조에 맞게 수정 필요

        categorized = {}

        for item in items:
            title_tag = item.select_one("a")
            if not title_tag:
                continue

            title = title_tag.get_text(strip=True)
            link = title_tag["href"]
            if not link.startswith("http"):
                link = url.rstrip("/") + "/" + link.lstrip("/")

            date = datetime.now().strftime("%Y-%m-%d")
            category = categorize(title)

            if category not in categorized:
                categorized[category] = []

            categorized[category].append({
                "title": title,
                "url": link,
                "date": date
            })

        return categorized

    except Exception as e:
        print(f"Failed to crawl {region_name}: {e}")
        return {}

# 전체 뉴스 딕셔너리
news_by_category = {}

for region, base_url in regions.items():
    articles_by_category = crawl_region(region, base_url)

    for category, articles in articles_by_category.items():
        if category not in news_by_category:
            news_by_category[category] = {}
        news_by_category[category][region] = articles

# 저장
with open("news-by-category.json", "w", encoding="utf-8") as f:
    json.dump(news_by_category, f, ensure_ascii=False, indent=2)

print("✅ news-by-category.json saved.")
