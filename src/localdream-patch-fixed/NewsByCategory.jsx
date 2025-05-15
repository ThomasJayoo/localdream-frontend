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
    <div className="space-y-10">
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="border rounded shadow p-4 bg-white">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium text-blue-800 hover:underline"
                >
                  [{item.local}] {item.title}
                </a>
                <div className="text-sm text-gray-500 mt-1">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
