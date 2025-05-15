
import Header from "./components/Header";

import YoutubeSection from "./components/YoutubeSection";
import NewsGrid from "./components/NewsByCategory";

function App() {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("❌ 뉴스 로딩 실패:", err));
  }, []);

  return (
    <div className="p-4">
      <YoutubeSection /> {/* 반드시 항상 렌더 */}
      <Header />
      <NewsBtCategory />
    </div>
  );
}

export default App;
