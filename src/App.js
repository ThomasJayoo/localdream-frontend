import React from "react";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./NewsByCategory";
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