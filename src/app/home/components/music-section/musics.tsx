import { MusicList } from "./components/music-list";

const Musics = () => {
  return (
    <div className="flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <p className="font-bold">Music</p>
        <p className="text-xs text-secondaryTextColor">View More</p>
      </div>
      <MusicList />
    </div>
  );
};

export default Musics;
