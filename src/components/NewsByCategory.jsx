import React, { useState, useEffect } from "react";

const allowedCategories = ["복지", "축제", "관광홍보", "건설행정", "인구대책", "커뮤니티뉴스"];

function processCategoryNews(items) {
  const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  return {
    top5: sorted.slice(0, 5),
    archive: sorted.slice(5)
  };
}

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});
  const [showArchive, setShowArchive] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = Object.fromEntries(
          Object.entries(data)
            .filter(([category]) => allowedCategories.includes(category))
            .map(([category, items]) => [category, processCategoryNews(items)])
        );
        setNewsData(filtered);
      })
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  const toggleArchive = (category) => {
    setShowArchive(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categoryPairs = Object.entries(newsData).reduce((acc, cur, idx) => {
    const row = Math.floor(idx / 2);
    if (!acc[row]) acc[row] = [];
    acc[row].push(cur);
    return acc;
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {categoryPairs.map((pair, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {pair.map(([category, data]) => {
            const showMore = showArchive[category];
            const hasMore = data.archive.length > 0;

            return (
              <div key={category}>
                <h2 className="text-lg font-bold text-blue-600 mb-2">{category}</h2>
                <div className="space-y-3">
                  {data.top5.map((item, idx) => (
                    <div key={idx} className="border p-3 rounded shadow bg-white">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 font-medium hover:underline"
                      >
                        📌 [{item.local}] {item.title}
                      </a>
                      <div className="text-sm text-gray-500">📅 {item.date}</div>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-3">
                    <button
                      onClick={() => toggleArchive(category)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {showMore ? "▲ 아카이브 닫기" : "▼ 아카이브 보기"}
                    </button>

                    {showMore && (
                      <div className="mt-3 space-y-3">
                        {data.archive.map((item, idx) => (
                          <div key={idx} className="border p-3 rounded shadow bg-gray-50">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 font-medium hover:underline"
                            >
                              📌 [{item.local}] {item.title}
                            </a>
                            <div className="text-sm text-gray-500">📅 {item.date}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
