
import json
import pandas as pd
import requests

def is_url_accessible(url):
    try:
        response = requests.head(url, timeout=5)
        return response.status_code == 200
    except:
        return False

def make_verified_json(excel_file="지자체.xlsx", output_file="verified_region_urls_230_filtered.json"):
    df = pd.read_excel(excel_file)
    df["지역명"] = df["시도명"].astype(str).str.strip() + " " + df["지자체"].astype(str).str.strip()

    result = {}
    for _, row in df.iterrows():
        region = row["지역명"]
        url = row["홈페이지"]
        if isinstance(url, str) and url.startswith("http"):
            print(f"확인 중: {region} → {url}")
            if is_url_accessible(url):
                result[region] = [url]

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"✅ {output_file} 생성 완료 ({len(result)}개 지자체)")

if __name__ == "__main__":
    make_verified_json()
