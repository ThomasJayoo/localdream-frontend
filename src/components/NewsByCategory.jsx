
import React, { useState, useEffect } from "react";

const allowedCategories = ["복지", "축제", "관광홍보", "건설행정", "인구대책", "커뮤니티뉴스"];

function extractCategory(text) {
  const match = text.match(/\[([^\]]+)\]/);
  return match ? match[1] : null;
}

function extractPostDate(text) {
  const match = text.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  return match ? match[0] : null;
}

function extractSummary(text) {
  const cleaned = text.replace(/\[.*?\]/g, "").replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/, "").trim();
  return cleaned.length > 100 ? cleaned.slice(0, 97) + "..." : cleaned;
}

function processNewsByCategory(flattenedNews) {
  const categoryMap = {};

  for (const item of flattenedNews) {
    const category = extractCategory(item.text);
    const date = extractPostDate(item.text);
    if (!allowedCategories.includes(category) || !date) continue;

    const cleanedItem = {
      title: item.text.replace(/\[.*?\]/g, "").trim(),
      summary: extractSummary(item.text),
      url: item.url,
      date,
      local: item.local
    };

    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(cleanedItem);
  }

  for (const category in categoryMap) {
    categoryMap[category].sort((a, b) => new Date(b.date) - new Date(a.date));
    categoryMap[category] = categoryMap[category].slice(0, 5);
  }

  return categoryMap;
}

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        const allNews = [];

        for (const [region, items] of Object.entries(data)) {
          for (const item of items) {
            if (!item.text || item.error) continue;
            allNews.push({ ...item, local: region });
          }
        }

        const byCategory = processNewsByCategory(allNews);
        setNewsData(byCategory);
      })
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  return (
    <div className="p-4">
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">📂 {category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="border p-4 rounded bg-white shadow">
                <div className="text-sm text-gray-600 mb-1">🏛 {item.local}</div>
                <a href={item.url} target="_blank" rel="noreferrer" className="font-semibold text-blue-700 hover:underline">
                  📌 {item.title}
                </a>
                <div className="text-sm text-gray-700 mt-1">{item.summary}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
