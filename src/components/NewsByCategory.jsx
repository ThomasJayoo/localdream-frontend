// (생략)
{Object.entries(newsData).map(([category, items]) => {
  const groupedByLocal = items.reduce((acc, cur) => {
    acc[cur.local] = acc[cur.local] || [];
    acc[cur.local].push(cur);
    return acc;
  }, {});
  return (
    <div key={category} className="mb-8">
      <h2 className="text-xl font-bold text-blue-700 mb-4">{category}</h2>
      {Object.entries(groupedByLocal).map(([local, localItems]) => (
        <div key={local} className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{local}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {localItems.slice(0, 5).map((item, idx) => (
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
  );
})}