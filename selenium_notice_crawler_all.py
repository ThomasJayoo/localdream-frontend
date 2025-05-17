import os
import json
import time
from collections import defaultdict
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime

def extract_notice_links(page_source, base_url):
    soup = BeautifulSoup(page_source, "html.parser")
    links = soup.find_all("a", href=True)
    notices = []
    for link in links:
        href = link["href"]
        text = link.get_text(strip=True)
        if "공지" in text or "알림" in text or "소식" in text or "보도" in text or "news" in href.lower():
            full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")
            notices.append({
                "text": text,
                "url": full_url
            })
    return notices

def main():
    with open("verified_region_urls.json", "r", encoding="utf-8") as f:
        verified = json.load(f)

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    results = defaultdict(list)

    for region, urls in verified.items():
        region_result = []
        for url in urls:
            try:
                driver.get(url)
                time.sleep(2.5)
                links = extract_notice_links(driver.page_source, url)
                if links:
                    region_result.extend(links)
            except Exception as e:
                print(f"[{region}] URL 실패: {url} → {e}")
                continue
        results[region] = region_result if region_result else [{"error": "no link found"}]

    driver.quit()

    with open("notice_links_all.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()