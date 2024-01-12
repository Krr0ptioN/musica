import {
  MusicPlayerControls,
  MusicPlayerProgressBar,
  MusicPlayerCover,
  MusicPlayerTitle,
} from '@musica/ui-shared';
import { useEffect, useRef, useState } from 'react';
import { useActions } from '../hooks/action';
import { useTypedSelector } from '../hooks/typed-selector';

export const MAX_MUSIC_SEEK = 100;
export const MIN_MUSIC_SEEK = 0;

export const MusicPlayer = () => {
  const musicAudioRef = useRef<HTMLAudioElement>(null);
  const { musics, selectedMusic, playing } = useTypedSelector(
    (state) => state.musics
  );

  const [loading, setLoading] = useState(true);

  const {
    playCurrentMusic,
    pauseCurrentMusic,
    playNextMusic,
    playPrevMusic,
    getAllMusics,
  } = useActions();
  const [playingMusic, playMusic] = useState(musics[selectedMusic]);

  const loadMusicsFromBackend = async () => {
    if (musics.length === 0) {
      getAllMusics();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMusicsFromBackend();
  }, []);

  const togglePlay = () => {
    if (playing) {
      pauseCurrentMusic();
    } else {
      playCurrentMusic();
    }
  };

  const handlerMusicSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const volume = Number(value) / MAX_MUSIC_SEEK;
  };

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

  useEffect(() => {
    playMusic(musics[selectedMusic]);
    setLoading(false);
  }, [musics, selectedMusic]);

  return (
    <div className="flex flex-col justify-between items-center rounded-xl sm:w-2/4 shadow-glass h-[30rem] bg-primary md:w-[390px]">
      <MusicPlayerCover src={playingMusic?.coverImageFileName} />
      {playingMusic ? (
        <MusicPlayerTitle
          name={playingMusic.name}
          artists={playingMusic.artists}
        />
      ) : (
        // TODO: [FEAT] Show a default music logo and loading
        // or waiting while no music is selected to be played #33
        // TEST: The scenario where user selected no music so
        // it should face a loading state.
        <MusicPlayerTitle
          name="Kill me right now"
          artists={['System of the Dawn']}
        />
      )}

      <audio src={playingMusic?.musicAudioFileName} ref={musicAudioRef}></audio>

      <MusicPlayerProgressBar
        duration="12:40"
        handlerMusicSeek={handlerMusicSeek}
      />

      <MusicPlayerControls
        musicPlaying={playing}
        musicPlayingToggle={togglePlay}
        musicPlayingNext={playNextMusic}
        musicPlayingPrev={playPrevMusic}
      />
    </div>
  );
};
