import React from "react";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./NewsByCategory";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-8">
        <YoutubeSection />
        <NewsByCategory />
      </div>
    </div>
  );
}

export default App;