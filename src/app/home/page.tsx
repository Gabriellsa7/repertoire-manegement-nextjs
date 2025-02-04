import { Header } from "@/components/header";
import BandSection from "./components/band-section/band-section";
import RepertoireBanner from "./components/new-repertoire-banner";
import Repertoires from "./components/repertoires-section/repertoires";
import Musics from "./components/music-section/musics";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <BandSection />
      <RepertoireBanner />
      <Repertoires />
      <Musics />
    </div>
  );
};

export default Home;
