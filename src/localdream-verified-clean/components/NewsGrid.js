import React from "react";

const NewsGrid = ({ newsData }) => {
  if (!newsData || Object.keys(newsData).length === 0) {
    return <p className="text-gray-500 text-sm">📭 로딩 중이거나 뉴스가 없습니다.</p>;
  }

  return (
    <div className="space-y-8">
      {Object.entries(newsData).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xl font-bold mb-4 text-indigo-700">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-4 border hover:border-indigo-300 transition duration-200"
              >
                <h4 className="text-md font-semibold text-gray-800">
                  <a href={item.link || "#"} className="hover:underline">
                    {item.title}
                  </a>
                </h4>
                {item.date && (
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;