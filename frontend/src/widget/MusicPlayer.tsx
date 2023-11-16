import { MusicPlayerControls } from '../components/MusicPlayerControls';
import { MusicStatusBar } from '../components/MusicStatusBar';
import { useEffect, useRef } from 'react';
import useToggle from '../hooks/toggle';

interface IMusicPlayerProps {
  cover: string;
  name: string;
  artist: string;
  file: string;
}

export const MusicPlayer = (music: IMusicPlayerProps) => {
  const [playing, togglePlay] = useToggle(false);
  const musicAudioRef = useRef<HTMLAudioElement>(null);

  // TODO: Get the play list of music from the backend
  // - Use redux and populate the playlist in a redux container
  const handlerNextMusic = () => { };
  useEffect(() => {
    const musicAudio = musicAudioRef.current;
    if (musicAudio) {
      if (playing) {
        musicAudio.play();
      } else {
        musicAudio.pause();
      }
    }
  }, [playing]);

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
      <audio src={music.file} ref={musicAudioRef}></audio>
      <MusicStatusBar status="40" duration={120} />
      <MusicPlayerControls
        musicPlaying={playing}
        musicPlayingToggle={togglePlay}
      />
    </div>
  );
};
