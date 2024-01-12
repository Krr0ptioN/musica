import { MusicPlayerBtn } from '@musica/ui-shared';

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
      <MusicPlayerBtn
        className="text-4xl fas fa-backward"
        title="previous"
        handlerOnClick={musicPlayingPrev}
      ></MusicPlayerBtn>

      {musicPlaying ? (
        <MusicPlayerBtn
          className="text-6xl fas fa-pause"
          handlerOnClick={musicPlayingToggle}
          title="pause"
        ></MusicPlayerBtn>
      ) : (
        <MusicPlayerBtn
          className="text-6xl fas fa-play"
          handlerOnClick={musicPlayingToggle}
          title="play"
        ></MusicPlayerBtn>
      )}
      <MusicPlayerBtn
        className="text-4xl fas fa-forward"
        handlerOnClick={musicPlayingNext}
        title="next"
      ></MusicPlayerBtn>
    </div>
  );
};
