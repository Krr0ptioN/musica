import MusicPlayerBtn from '../music-player-btn/music-player-btn';

/* eslint-disable-next-line */
export interface MusicPlayerControlsProps {
  musicPlaying: boolean | (() => void);
  musicPlayingToggle: () => void;
  musicPlayingNext: () => void;
  musicPlayingPrev: () => void;
}

export function MusicPlayerControls(props: MusicPlayerControlsProps) {
  return (
    <div className="flex relative flex-row justify-center items-center -top-[20px]">
      <MusicPlayerBtn
        className="text-4xl fas fa-backward"
        title="previous"
        handlerOnClick={props.musicPlayingPrev}
      ></MusicPlayerBtn>

      {props.musicPlaying ? (
        <MusicPlayerBtn
          className="text-6xl fas fa-pause"
          handlerOnClick={props.musicPlayingToggle}
          title="pause"
        ></MusicPlayerBtn>
      ) : (
        <MusicPlayerBtn
          className="text-6xl fas fa-play"
          handlerOnClick={props.musicPlayingToggle}
          title="play"
        ></MusicPlayerBtn>
      )}
      <MusicPlayerBtn
        className="text-4xl fas fa-forward"
        handlerOnClick={props.musicPlayingNext}
        title="next"
      ></MusicPlayerBtn>
    </div>
  );
}

export default MusicPlayerControls;
