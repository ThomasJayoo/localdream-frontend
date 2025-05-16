import React from "react";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./components/NewsByCategory";

function formatKoreanDate(dateObj) {
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const day = week[dateObj.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}  로컬드림`;
}

export default function App() {
  const todayStr = formatKoreanDate(new Date());

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-xl font-bold text-blue-800">{todayStr}</h1>
      </header>
      <section className="mb-8">
        <YoutubeSection />
      </section>
      <main>
        <NewsByCategory />
      </main>
    </div>
  );
}
