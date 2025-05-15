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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">로컬 뉴스 카테고리별 분류</h1>
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">{category}</h2>
          <ul className="space-y-1 list-disc pl-6">
            {items.map((item, idx) => (
              <li key={idx}>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  [{item.local}] {item.title}
                </a>{" "}
                <span className="text-gray-500 text-sm">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
