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

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold text-center text-teal-700">로컬드림</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        <YoutubeSection />
        <NewsByCategory />
      </main>
    </div>
  );
}
export default App;