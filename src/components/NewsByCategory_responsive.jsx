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
    <div className="p-4 sm:p-6 md:p-10 max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
        로컬 뉴스 카드 보기
      </h1>
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b border-blue-200">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2 text-base sm:text-lg">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      [{item.local}] {item.title}
                    </a>
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
