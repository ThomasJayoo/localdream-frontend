
import os
import re
import json
import time
from collections import defaultdict
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime

def extract_post_date(text_block):
    """
    다양한 텍스트 블록에서 YYYY-MM-DD 또는 유사한 날짜 형식을 탐색
    """
    # 게시일: 2025.05.12, 2025-05-12, 2025/05/12
    match = re.search(r'20\d{2}[./-]\d{1,2}[./-]\d{1,2}', text_block)
    if match:
        raw = match.group(0).replace(".", "-").replace("/", "-")
        try:
            parts = list(map(int, raw.split("-")))
            return datetime(parts[0], parts[1], parts[2]).isoformat()
        except:
            return None
    return None

def extract_notice_links_with_date(page_source, base_url):
    soup = BeautifulSoup(page_source, "html.parser")
    links = soup.find_all("a", href=True)
    notices = []

    for link in links:
        text = link.get_text(strip=True)
        href = link["href"]
        if not href or len(text) < 3:
            continue

        full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")

        # 부모 블록에서 텍스트 덩어리 수집
        parent = link.find_parent(["tr", "li", "div", "td"])
        context_text = ""
        if parent:
            context_text = parent.get_text(" ", strip=True)
        else:
            context_text = text

        # 페이지 전체 텍스트도 fallback용으로 준비
        full_page_text = soup.get_text(" ", strip=True)

        # 게시일 추출 시도 (문맥 > 전체 페이지 > 실패 시 현재 시간)
        post_date = extract_post_date(context_text)
        if not post_date:
            post_date = extract_post_date(full_page_text)
        if not post_date:
            post_date = datetime.now().isoformat()

        notices.append({
            "text": text,
            "url": full_url,
            "post_date": post_date,
            "date": datetime.now().isoformat()
        })

    return notices

def main():
    with open("verified_region_urls.json", "r", encoding="utf-8") as f:
        region_urls = json.load(f)

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=options)

    all_results = defaultdict(list)

    for region, urls in region_urls.items():
        region_result = []
        for url in urls:
            try:
                driver.get(url)
                time.sleep(2.5)
                links = extract_notice_links_with_date(driver.page_source, url)
                if links:
                    region_result.extend(links)
            except Exception as e:
                print(f"[{region}] 실패: {e}")
                continue
        all_results[region] = region_result if region_result else [{"error": "no link found"}]

    driver.quit()

    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
