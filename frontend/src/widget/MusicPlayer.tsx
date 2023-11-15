import { MusicStatusBar } from '../components/MusicStatusBar';

interface IMusicPlayerProps {
  cover: string;
  name: string;
  artist: string;
  file: string;
}

export const MusicPlayer = (music: IMusicPlayerProps) => {
  return (
    <div className="flex flex-col justify-between items-center bg-black rounded-xl sm:w-2/4 shadow-glass h-[30rem] bg-primary md:w-[390px]">
      <img
        src={music.cover}
        className="p-30 object-cover h-[60%] shadow-glass w-[80%] relative -top-[30px] rounded-xl"
        alt=""
      />
      <div className="flex flex-col items-center">
        <span className="text-2xl font-extrabold">{music.name}</span>
        <span className="text-xl font-light">{music.artist}</span>
      </div>
      <audio src={music.file} controls></audio>
      <MusicStatusBar status={30} />
    </div>
  );
};
