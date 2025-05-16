{Object.entries(newsData).map(([category, items]) => (
  <div key={category} className="mb-6">
    <h2 className="text-xl font-bold text-blue-700">{category}</h2>
    
    {/* 지역별 그룹핑 */}
    {Object.entries(
      items.reduce((acc, cur) => {
        const local = cur.local;
        acc[local] = acc[local] || [];
        acc[local].push(cur);
        return acc;
      }, {})
    ).map(([local, localItems]) => (
      <div key={local} className="mt-4">
        <h3 className="text-md font-semibold text-gray-800">{local}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {localItems.map((item, idx) => (
            <div key={idx} className="border p-3 rounded shadow bg-white">
              <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline">
                📌 {item.title}
              </a>
              <div className="text-sm text-gray-500">📅 {item.date}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
))}