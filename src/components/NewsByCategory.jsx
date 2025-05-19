import React, { useState, useEffect } from "react";

const allowedCategories = ["복지", "축제", "관광홍보", "건설행정", "인구대책", "커뮤니티뉴스"];

function extractCategory(text) {
  const match = text.match(/\[([^\]]+)\]/);
  return match ? match[1] : null;
}

function processNewsByCategory(flattenedNews) {
  const categoryMap = {};

  for (const item of flattenedNews) {
    const category = extractCategory(item.text);
    if (!allowedCategories.includes(category)) continue;

    const cleanedItem = {
      title: item.text.replace(/\[[^\]]+\]/, "").trim(),
      url: item.url,
      date: item.date,
      local: item.local
    };

    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(cleanedItem);
  }

  // 정렬 및 상위 5개만 추출
  for (const category in categoryMap) {
    categoryMap[category].sort((a, b) => new Date(b.date) - new Date(a.date));
    categoryMap[category] = {
      top5: categoryMap[category].slice(0, 5),
      archive: categoryMap[category].slice(5)
    };
  }

  return categoryMap;
}

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});
  const [showArchive, setShowArchive] = useState(false);

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

  const categoryList = Object.entries(newsData);
  const visibleCategories = categoryList.slice(0, 5);
  const archivedCategories = categoryList.slice(5);

  return (
    <div className="p-4">
      {[...visibleCategories, ...(showArchive ? archivedCategories : [])].map(([category, data]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-3">📂 {category}</h2>
          <div className
