import React, { useState } from "react";

const NewsGrid = ({ newsData }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  if (!newsData || Object.keys(newsData).length === 0) {
    return <p className="text-gray-500 text-sm">📭 로딩 중이거나 뉴스가 없습니다.</p>;
  }

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="space-y-8">
      {Object.entries(newsData).map(([category, items]) => {
        const isExpanded = expandedCategories[category] || false;
        const visibleItems = isExpanded ? items : items.slice(0, 5);

        return (
          <div key={category}>
            <h3 className="text-xl font-bold mb-4 text-indigo-700">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-lg p-4 border hover:border-indigo-300 transition duration-200"
                >
                  <h4 className="text-md font-semibold text-gray-800">
                    <a href={item.link || "#"} className="hover:underline" target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </h4>
                  {item.date && (
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  )}
                </div>
              ))}
            </div>
            {items.length > 5 && (
              <button
                onClick={() => toggleCategory(category)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                {isExpanded ? "접기 ▲" : "더보기 ▼"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NewsGrid;