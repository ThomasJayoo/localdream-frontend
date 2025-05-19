import os
import json
import time
from collections import defaultdict
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime

def extract_notice_links_with_date(page_source, base_url):
    soup = BeautifulSoup(page_source, "html.parser")
    links = soup.find_all("a", href=True)
    notices = []

    for link in links:
        text = link.get_text(strip=True)
        href = link["href"]
        if not href or not text:
            continue
        if "공지" not in text and "소식" not in text and "보도" not in text:
            continue
        full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")

        # 작성일 추출 시도
        date_text = ""
        parent = link.find_parent(["tr", "li", "div"])
        if parent:
            candidates = parent.find_all(string=True)
            for c in candidates:
                s = c.strip()
                if any(y in s for y in ["2025", "2024", "2023"]) and len(s) >= 8:
                    date_text = s
                    break

        date_iso = None
        for sep in [".", "-", "/"]:
            try:
                parts = date_text.replace(" ", "").split(sep)
                if len(parts) >= 3:
                    y, m, d = map(int, parts[:3])
                    date_iso = datetime(y, m, d).date().isoformat()
                    break
            except:
                continue

        if not date_iso:
            date_iso = datetime.now().date().isoformat()

        notices.append({
            "title": text,
            "url": full_url,
            "date": date_iso
        })

    return notices

def main():
    with open("verified_region_urls.json", "r", encoding="utf-8") as f:
        region_urls = json.load(f)

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    all_results = defaultdict(list)

    for region, urls in region_urls.items():
        for url in urls:
            try:
                driver.get(url)
                time.sleep(2.5)
                items = extract_notice_links_with_date(driver.page_source, url)
                all_results[region].extend(items)
            except Exception as e:
                print(f"[{region}] 오류: {e}")
                continue

    driver.quit()

    with open("notice_links_all_with_category.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()