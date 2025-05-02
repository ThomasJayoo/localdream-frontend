import React from "react";
import "./YoutubeSection.css"; // 선택적으로 별도 스타일 분리 가능

const YoutubeSection = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-blue-500">
        화제의 인물 (Youtube)
      </h2>
      <div className="video-grid">
        <iframe
          src="https://www.youtube.com/embed/KCyNIAeVHQA"
          title="Video 1"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/fM4BuCgM0CI"
          title="Video 2"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeSection;
