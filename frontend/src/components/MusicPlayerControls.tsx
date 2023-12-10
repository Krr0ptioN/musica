import react, { useEffect } from 'react';
import { Btn } from './Btn';

interface MusicPlayerControlProps {
  musicPlaying: boolean | (() => void);
  musicPlayingToggle: () => void;
  musicPlayingNext: () => void;
  musicPlayingPrev: () => void;
}

export const MusicPlayerControls: React.FC<MusicPlayerControlProps> = ({
  musicPlaying,
  musicPlayingToggle,
  musicPlayingNext,
  musicPlayingPrev,
}) => {
  return (
    <div className="flex relative flex-row justify-center items-center -top-[20px]">
      <Btn
        className="text-4xl fas fa-backward"
        title="previous"
        handlerOnClick={musicPlayingPrev}
      ></Btn>

      {musicPlaying ? (
        <Btn
          className="text-6xl fas fa-pause"
          handlerOnClick={musicPlayingToggle}
          title="pause"
        ></Btn>
      ) : (
        <Btn
          className="text-6xl fas fa-play"
          handlerOnClick={musicPlayingToggle}
          title="play"
        ></Btn>
      )}
      <Btn
        className="text-4xl fas fa-forward"
        handlerOnClick={musicPlayingNext}
        title="next"
      ></Btn>
    </div>
  );
};
