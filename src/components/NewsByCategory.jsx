
import React, { useEffect, useState } from "react";

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
    if (!category || !date) continue;

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

export default function NewsByCategory({ newsData }) {
  if (!newsData || typeof newsData !== "object") {
    return <p className="text-center text-gray-500">뉴스 데이터를 불러오는 중입니다...</p>;
  }

  const categoryList = ["복지", "축제", "관광홍보", "건설행정", "커뮤니티뉴스", "인구대책"];
  const categoryPairs = [];

  for (let i = 0; i < categoryList.length; i += 2) {
    const row = [];
    for (let j = 0; j < 2; j++) {
      const category = categoryList[i + j];
      if (!category) continue;
      const items = newsData[category] || [];
      row.push([category, items]);
    }
    categoryPairs.push(row);
  }

  return (
    <div className="p-4 space-y-10">
      {categoryPairs.map((pair, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {pair.map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-indigo-700 mb-4">📂 {category}</h2>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center justify-between border-b pb-2"
                  >
                    <div className="text-sm text-gray-600 md:w-1/4">{item.local}</div>
                    <div className="text-sm font-medium text-blue-700 md:w-2/4 truncate">
                      <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline">
                        {item.title}
                      </a>
                    </div>
                    <div className="text-xs text-gray-500 text-right md:w-1/4">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}