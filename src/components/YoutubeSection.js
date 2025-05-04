import React from "react";

const YoutubeSection = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">화제의 인물 (Youtube)</h2>
      <div className="grid grid-clos-1 md:grid-cols-2 gap-4">
        <iframe
          src="https://www.youtube.com/embed/영상1ID"
          title="Video 1"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        />
      <h2 className=text-xl front-semibold mb-4"> 지자체포커스
      <div className="video-grid">
        <iframe
          src="https://www.youtube.com/embed/영상2ID"
          title="Video 2"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        />
      </div>
    </div>
  );
};

export default YoutubeSection;