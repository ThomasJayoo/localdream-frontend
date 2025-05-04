import React from "react";

const videos = [
  {
    title: "MBC 뉴스 - 화제의 인물",
    url: "https://www.youtube.com/embed/영상1ID"
  },
  {
    title: "KBS 인터뷰 - 고장의 인물",
    url: "https://www.youtube.com/embed/영상2ID"
  }
];

const YoutubeSection = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        화제의 인물 (Youtube)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index}>
            <div className="aspect-w-16 aspect-h-9 mb-2">
              <iframe
                src={video.url}
                title={video.title}
                allowFullScreen
                className="w-full"
                style={{height:"215px", border:"none"}}
              />
            </div>
            <p className="text-center font-medium text-sm text-gray-700">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSection;