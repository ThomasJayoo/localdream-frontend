import Header from "./components/Header";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./NewsByCategory";

function App() {
  return (
    <div className="p-4">
      <YoutubeSection />
      <Header />
      <NewsByCategory />
    </div>
  );
}

export default App;
