
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime

def extract_notices_from_page(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    notices = []
    table = soup.find("table")
    if not table:
        return []
    for row in table.find_all("tr"):
        cols = row.find_all("td")
        if len(cols) < 5:
            continue
        title_cell = cols[1]
        date_cell = cols[4]
        a_tag = title_cell.find("a")
        if not a_tag:
            continue
        title = a_tag.get_text(strip=True)
        href = a_tag.get("href")
        full_url = href if href.startswith("http") else base_url.rstrip("/") + "/" + href.lstrip("/")
        raw_date = date_cell.get_text(strip=True)
        try:
            parsed_date = datetime.strptime(raw_date, "%Y-%m-%d").isoformat()
        except:
            parsed_date = datetime.now().isoformat()
        notices.append({
            "text": title,
            "url": full_url,
            "date": parsed_date
        })
    return notices

def crawl_verified_urls(input_file="verified_region_urls_230_filtered.json", output_file="notice_links_all.json"):
    with open(input_file, "r", encoding="utf-8") as f:
        region_urls = json.load(f)

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    result = {}
    count = 0

    for region, urls in region_urls.items():
        if not urls:
            continue
        url = urls[0]
        print(f"📡 크롤링 중: {region} → {url}")
        try:
            driver.get(url)
            time.sleep(2.5)
            notices = extract_notices_from_page(driver.page_source, url)
            result[region] = notices if notices else [{"error": "no link found"}]
        except Exception as e:
            print(f"❌ 오류: {region} - {e}")
            result[region] = [{"error": str(e)}]

        count += 1
        if count % 5 == 0:
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(result, f, ensure_ascii=False, indent=2)

    driver.quit()

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"✅ notice_links_all.json 생성 완료 ({len(result)}개 지자체)")
