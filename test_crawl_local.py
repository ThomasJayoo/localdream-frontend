import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime
import re

CATEGORY_KEYWORDS = {
    "복지": ["복지", "지원", "창업", "노인", "청년", "생활", "의료", "돌봄"],
    "축제": ["축제", "행사", "공연", "페스티벌", "콘서트", "불꽃놀이"],
    "관광홍보": ["관광", "홍보", "여행", "투어", "체험", "문화재", "캠페인"],
    "건설행정": ["도로", "건설", "인프라", "행정", "공사", "정비", "안전", "설명회"],
    "커뮤니티뉴스": ["주민", "공지", "알림", "소식", "안내", "모집", "신청"],
    "인구대책": ["출산", "인구", "감소", "고령화", "청년인구", "정책"]
}

def guess_category(title):
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in title:
                return category
    return "커뮤니티뉴스"

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

def extract_notice_links_with_date(page_source, base_url, local):
    soup = BeautifulSoup(page_source, "html.parser")
    links = soup.find_all("a", href=True)
    notices = []

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

def main():
    test_urls = {
        "서울특별시 중구": "https://www.junggu.seoul.kr/content.do?cmsid=14231",
        "서울특별시 용산구": "https://www.yongsan.go.kr/portal/bbs/B0000041/list.do?menuNo=200228"
    }

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    all_results = []

    for region, url in test_urls.items():
        try:
            print(f"[INFO] {region} 접속 중: {url}")
            driver.get(url)
            time.sleep(3)
            notices = extract_notice_links_with_date(driver.page_source, url, region)
            print(f"[✅] {region}: {len(notices)}건 수집됨")
            all_results.extend(notices)
        except Exception as e:
            print(f"[❌] {region} 실패: {e}")
            continue

    driver.quit()

    # 결과 출력
    print(json.dumps(all_results, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
