// src/components/YoutubeSection.js
import React from "react";

const videos = [
  {
    title: "집중 논단"
    url: "https://www.youtube.com/embed/영상1ID"
  },
  {
    title: "촛점 인터뷰"
    url: "https://www.youtube.com/embed/영상2ID"
  }
];

const YoutubeSection = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">
        화제의 인물 (Youtube)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <div key={index}>
              <iframe
                src={video.url}
                title={video.title}
                allowFullScreen
                className="w-full"
                style={{height:"215px", border:"none"}}
              />
            </div>
            <p className="mt-2 text-sm text-center">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSection;