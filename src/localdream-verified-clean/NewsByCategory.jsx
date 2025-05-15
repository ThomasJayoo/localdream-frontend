
import { useEffect, useState } from "react";

export default function NewsByCategory() {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">로컬 뉴스 카테고리별 분류</h1>
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="border p-4 rounded shadow bg-white">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-blue-700 hover:underline"
                >
                  [{item.local}] {item.title}
                </a>
                <div className="text-sm text-gray-500 mt-1">📅 {item.date}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
