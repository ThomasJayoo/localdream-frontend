import os
import re
import json
import time
from collections import defaultdict
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime

# ✅ 카테고리 키워드 사전
CATEGORY_KEYWORDS = {
    "복지": ["복지", "지원", "창업", "노인", "청년", "생활", "의료", "돌봄"],
    "축제": ["축제", "행사", "공연", "페스티벌", "콘서트", "불꽃놀이"],
    "관광홍보": ["관광", "홍보", "여행", "투어", "체험", "문화재", "캠페인"],
    "건설행정": ["도로", "건설", "인프라", "행정", "공사", "정비", "안전", "설명회"],
    "커뮤니티뉴스": ["주민", "공지", "알림", "소식", "안내", "모집", "신청"],
    "인구대책": ["출산", "인구", "감소", "고령화", "청년인구", "정책"]
}

# ✅ 제목 기반 카테고리 추론
def guess_category(title):
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in title:
                return category
    return "커뮤니티뉴스"  # 기본값

# ✅ 날짜 추출
def extract_post_date(text_block):
    match = re.search(r'20\d{2}[./-]\d{1,2}[./-]\d{1,2}', text_block)
    if match:
        raw = match.group(0).replace(".", "-").replace("/", "-")
        try:
            parts = list(map(int, raw.split("-")))
            return datetime(parts[0], parts[1], parts[2]).isoformat()
        except:
            return None
    return None

# ✅ HTML에서 공지사항 추출 + 카테고리 분류
def extract_notice_links_with_date(page_source, base_url, local):
    soup = BeautifulSoup(page_source, "html.parser")
    links = soup.find_all("a", href=True)
    notices = []
    all_notice = []

    for notice in notices:
        category = notice["category"]
        categorized_results[category].append(notice)
        all_notices.append(notice)  # ← 추가

    for link in links:
        text = link.get_text(strip=True)
        href = link["href"]
        if not href or len(text) < 3:
            continue

        full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")

        parent = link.find_parent(["tr", "li", "div", "td"])
        context_text = parent.get_text(" ", strip=True) if parent else text
        full_page_text = soup.get_text(" ", strip=True)

        post_date = extract_post_date(context_text) or extract_post_date(full_page_text) or datetime.now().isoformat()
        category = guess_category(text)

        notices.append({
            "text": text,
            "url": full_url,
            "date": post_date,
            "local": local,
            "category": category
        })

    return notices

# ✅ 메인 실행
def main():
    with open("selector_list_230_fixed_v2.json", "r", encoding="utf-8") as f:
        region_urls = json.load(f)

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    categorized_results = {key: [] for key in CATEGORY_KEYWORDS.keys()}
    failed_regions = []

    for region, info in region_urls.items():
        url = info.get("url")  # ✅ 여기서 info는 dict
        if not url:
            print(f"[스킵] {region}: URL 없음")
            continue

        try:
            print(f"[INFO] {region} 접속 중: {url}")
            driver.get(url)
            time.sleep(2.5)
            notices = extract_notice_links_with_date(driver.page_source, url, region)
            print(f"[✅] {region}: {len(notices)}건 수집")
            for notice in notices:
                categorized_results[notice["category"]].append(notice)

        except Exception as e:
            print(f"[❌] {region} 실패: {e}")
            failed_regions.append({
                "region": region,
                "url": url,
                "error": str(e)
            })
with open("public/data/news_raw_all.json", "w", encoding="utf-8") as f:
    json.dump(all_notices, f, ensure_ascii=False, indent=2)
 
   driver.quit()

    for category in categorized_results:
        categorized_results[category].sort(key=lambda x: x["date"], reverse=True)
        categorized_results[category] = categorized_results[category][:5]

    with open("public/data/news.json", "w", encoding="utf-8") as f:
        json.dump(categorized_results, f, ensure_ascii=False, indent=2)

    with open("fail_log.txt", "w", encoding="utf-8") as f:
        for fail in failed_regions:
            f.write(f"{fail['region']}\t{fail['url']}\n에러: {fail['error']}\n\n")

    print(f"✅ 완료: news.json 저장, 실패 {len(failed_regions)}곳 → fail_log.txt 기록됨")

if __name__ == "__main__":
    main()