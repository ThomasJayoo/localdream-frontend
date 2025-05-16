import React, { useState, useEffect } from "react";  // ✅ useState, useEffect 불러오기

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});  // ✅ newsData 정의

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  return (
    <div className="p-4">
      {newsData && Object.entries(newsData).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="border p-4 rounded shadow bg-white">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-700 font-medium hover:underline">
                  📌 {item.title}
                </a>
                <div className="text-sm text-gray-500">📅 {item.date}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}