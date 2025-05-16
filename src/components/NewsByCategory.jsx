import React, { useState, useEffect } from "react";

const allowedCategories = ["복지", "축제", "관광홍보", "건설행정", "인구대책", "커뮤니티뉴스"];

function formatKoreanDate(dateObj) {
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const day = week[dateObj.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}`;
}

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});
  const [showArchive, setShowArchive] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = Object.fromEntries(
          Object.entries(data).filter(([category]) => allowedCategories.includes(category))
        );
        setNewsData(filtered);
      })
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  const todayStr = formatKoreanDate(new Date());

  const toggleArchive = (category) => {
    setShowArchive(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-600">🗓 {todayStr}</span>
        <h1 className="text-2xl font-bold text-blue-800">로컬드림</h1>
      </div>

      {Object.entries(newsData).map(([category, items]) => {
        const showMore = showArchive[category];
        const visibleItems = showMore ? items : items.slice(0, 5);
        const hasMore = items.length > 5;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleItems.map((item, idx) => (
                <div key={idx} className="border p-4 rounded shadow bg-white">
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
              <button
                onClick={() => toggleArchive(category)}
                className="mt-3 text-sm text-blue-500 hover:underline"
              >
                {showMore ? "▲ 아카이브 닫기" : "▼ 아카이브 보기"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
