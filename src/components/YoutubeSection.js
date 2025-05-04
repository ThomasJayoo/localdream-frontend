// src/components/YoutubeSection.js
import React from "react";
import "./YoutubeSection.css"; // 아래에 작성된 CSS 포함

const videos = [
  {
    title: "집중 논단",
    url: "https://www.youtube.com/embed/KCyNIAeVHQA"
  },
  {
    title: "촛점 인터뷰",
    url: "https://www.youtube.com/embed/fM4BuCgM0CI"
  }
];

const YoutubeSection = () => {
  return (
    <div className="Youtube-scetion">
 <h2 className="youtube-title">🔥 집중 영상 (Youtube)</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <iframe
              src={video.url}
              title={video.title}
              allowFullScreen
              className="video-frame"
            />
            <p className="video-title">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSection;