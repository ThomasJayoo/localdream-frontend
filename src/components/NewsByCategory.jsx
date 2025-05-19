
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

function processNewsByCategory(flattenedNews) {
  const categoryMap = {};

  for (const item of flattenedNews) {
    const category = extractCategory(item.text);
    const date = extractPostDate(item.text);
    if (!allowedCategories.includes(category) || !date) continue;

    const cleanedItem = {
      title: item.text.replace(/\[.*?\]/g, "").trim(),
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
    <div className="p-4 space-y-10">
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-bold text-indigo-700 mb-4">📂 {category}</h2>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between border-b pb-2"
              >
                <div className="text-sm text-gray-600 md:w-1/4">🏛 {item.local}</div>
                <div className="text-sm font-medium text-blue-700 md:w-2/4">
                  <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline">
                    📌 {item.title}
                  </a>
                </div>
                <div className="text-xs text-gray-500 text-right md:w-1/4">🗓 {item.date}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
