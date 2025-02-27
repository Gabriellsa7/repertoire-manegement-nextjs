"use client";
import { AvailableMusicList } from "./components/available-music";
import { RepertoireHeader } from "./components/repertoire-header";
import { RepertoireMusicList } from "./components/repertoire-music-list";

export const RepertoireInfo = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white m-4">
      <RepertoireHeader />
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <RepertoireMusicList />
        <AvailableMusicList />
      </div>
    </div>
  );
};

export default RepertoireInfo;
