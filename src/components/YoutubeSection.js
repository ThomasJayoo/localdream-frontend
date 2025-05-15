const videos = [
  {
    title: "집중 논단",
    url: "https://www.youtube.com/embed/KCyNIAeVHQA"
  },
  {
    title: "초청 인터뷰",
    url: "https://www.youtube.com/embed/fM4BuCgM0CI"
  }
];

export default function YoutubeSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {videos.map((video, i) => (
        <div key={i} className="w-full">
          <div className="text-lg font-semibold text-gray-800 mb-2">{video.title}</div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              title={video.title}
              src={video.url}
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-md shadow"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}