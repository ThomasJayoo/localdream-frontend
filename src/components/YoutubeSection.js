import React from "react";

const topicVideos = [
  {
    title: "집중 논단",
    url: "https://www.youtube.com/embed/KCyNIAeVHQA",
  },
];

const interviewVideos = [
  {
    title: "촛점 인터뷰",
    url: "https://www.youtube.com/embed/fM4BuCgM0CI",
  },
];

const VideoGrid = ({ videos }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {videos.map((video, index) => (
      <div key={index}>
        <iframe
          src={video.url}
          title={video.title}
          allowFullScreen
          className="w-full"
          style={{ height: "215px", border: "none" }}
        />
        <p className="mt-2 text-sm text-center">{video.title}</p>
      </div>
    ))}
  </div>
);

const YoutubeSection = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">집중 논단 (Youtube)</h2>
      <VideoGrid videos={topicVideos} />

      <h2 className="text-xl font-bold mt-10 mb-4">촛점 인터뷰 (Youtube)</h2>
      <VideoGrid videos={interviewVideos} />
    </div>
  );
};

export default YoutubeSection;
