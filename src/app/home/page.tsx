import { Header } from "@/components/header";
import BandSection from "./components/band-section";
import RepertoireBanner from "./components/new-repertoire-banner";
import Repertoires from "./components/repertoires";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <BandSection />
      <RepertoireBanner />
      <Repertoires />
    </div>
  );
};

export default Home;
