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
        if "공지" in text or "알림" in text or "소식" in text or "보도" in text or "news" in href.lower():
            full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")

            # 작성일 추출
            parent = link.find_parent(["tr", "li", "div"])
            date_text = ""
            if parent:
                date_candidates = parent.find_all(string=True)
                for s in date_candidates:
                    s = s.strip()
                    if any(x in s for x in ["2025", "2024", "2023"]) and len(s) >= 8:
                        date_text = s
                        break

            # 날짜 정제
            date_iso = None
            for sep in [".", "-", "/"]:
                try:
                    parts = date_text.replace(" ", "").split(sep)
                    if len(parts) >= 3:
                        y, m, d = map(int, parts[:3])
                        date_iso = datetime(y, m, d).isoformat()
                        break
                except:
                    continue

            if not date_iso:
                date_iso = datetime.now().isoformat()

            notices.append({
                "text": text,
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

    with open("notice_links_all.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()