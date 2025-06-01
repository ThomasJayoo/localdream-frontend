
import React, { useEffect, useState } from "react";

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    fetch("/data/news.json")
      .then(res => res.json())
      .then(data => {
        // 카테고리별 정렬: 최신 5개만 날짜 기준으로 유지
        const sortedData = {};
        for (const [category, items] of Object.entries(data)) {
          const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
          sortedData[category] = sorted.slice(0, 5);
        }
        setNewsData(sortedData);
      })
      .catch(err => console.error("❌ 뉴스 데이터를 불러오는 데 실패했습니다:", err));
  }, []);

  if (!newsData) {
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
                    <div className="text-xs text-gray-500 text-right md:w-1/4">
                      {new Date(item.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                      })}
                    </div>
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
