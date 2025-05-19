import React from "react";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./components/NewsByCategory";

function formatKoreanDate(dateObj) {
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const day = week[dateObj.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}`;
}

export default function App() {
  const todayStr = formatKoreanDate(new Date());

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* 헤더: 날짜 왼쪽, 제목 가운데 */}
      <div className="flex justify-between items-center mb-6 relative">
        <div className="text-blue-800 font-bold text-lg absolute left-0">{todayStr}</div>
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold text-indigo-700">로컬드림</h1>
        </div>
      </div>

      {/* 본문 2단 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <YoutubeSection />
        </div>
        <div>
          <NewsByCategory />
        </div>
      </div>
    </div>
  );
}