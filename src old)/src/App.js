// src/components/YoutubeSection.js
import React from "react";
import "./components/YoutubeSection.css";

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

export default function YoutubeSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((video, i) => (
        <div key={i} className="aspect-video">
          <iframe
            title={video.title}
            src={video.url}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ))}
    </div>
  );
}
