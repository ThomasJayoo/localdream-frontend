// src/components/FocusSection.js
import React from "react";

const FocusSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="border p-4">
        <h2 className="font-semibold mb-2">화제의 인물 (Youtube)</h2>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          title="화제의 인물"
          allowFullScreen
        />
      </div>
      <div className="border p-4">
        <h2 className="font-semibold mb-2">앞서는 우리 고장 (Youtube)</h2>
        <iframe
          width="100%"
          height="200"
          src="https://www.youtube.com/embed/5qap5aO4i9A"
          title="우리 고장"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FocusSection;
