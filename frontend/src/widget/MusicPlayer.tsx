import { MusicPlayerControls } from '../components/MusicPlayerControls';
import { MusicStatusBar } from '../components/MusicStatusBar';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MusicsState } from '@musica/store';
import { useActions } from '../hooks/action';
import { Music } from '@musica/types';

export const MusicPlayer = () => {
  const musicAudioRef = useRef<HTMLAudioElement>(null);
  const state: MusicsState = useSelector((state) => state);
  const { playCurrentMusic, pauseCurrentMusic, playNextMusic, playPrevMusic } =
    useActions();
  const [playingMusic, playMusic] = useState(state.musics[state.selectedMusic]);

  const togglePlay = () => {
    if (state.playing) {
      pauseCurrentMusic();
    } else {
      playCurrentMusic();
    }
  };

  useEffect(() => {
    const musicAudio = musicAudioRef.current;
    if (musicAudio) {
      if (state.playing) {
        musicAudio.play();
      } else {
        musicAudio.pause();
      }
    }
  }, [state.playing]);

  useEffect(() => {
    playMusic(state.musics[state.selectedMusic]);
  }, [state.musics, state.selectedMusic]);

  return (
    <div className="flex flex-col justify-between items-center bg-black rounded-xl sm:w-2/4 shadow-glass h-[30rem] bg-primary md:w-[390px]">
      <img
        src={undefined}
        className="p-30 object-cover h-[60%] shadow-glass w-[80%] relative -top-[30px] rounded-xl"
        alt=""
      />
      <div className="flex flex-col items-center">
        <span className="text-2xl font-extrabold">{playingMusic.name}</span>
        <span className="text-xl font-light">
          {playingMusic.artists && playingMusic.artists[0]}
        </span>
      </div>
      <audio src={playingMusic.file} ref={musicAudioRef}></audio>
      <MusicStatusBar status="40" duration={120} />
      <MusicPlayerControls
        musicPlaying={state.playing}
        musicPlayingToggle={togglePlay}
        musicPlayingNext={playNextMusic}
        musicPlayingPrev={playPrevMusic}
      />
    </div>
  );
};
