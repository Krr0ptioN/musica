import react, { useEffect } from 'react';

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
  const togglePlayIcon = () => {
    if (musicPlaying) {
      document
        .getElementById('play-btn')
        ?.classList.replace('fa-play', 'fa-pause');
    } else {
      document
        .getElementById('play-btn')
        ?.classList.replace('fa-pause', 'fa-play');
    }
  };

  useEffect(togglePlayIcon, [musicPlaying]);

  const handleTogglePlay = () => {
    if (typeof musicPlayingToggle === 'function') {
      musicPlayingToggle();
    }
  };

  const handleNextPlay = () => {
    if (typeof musicPlayingToggle === 'function') {
      musicPlayingNext();
    }
  };
  const handlePrevPlay = () => {
    if (typeof musicPlayingToggle === 'function') {
      musicPlayingPrev();
    }
  };
  return (
    <div className="flex relative flex-row justify-center items-center -top-[10px]">
      <i
        className="p-3 text-4xl hover:text-gray-700 fas fa-backward"
        title="previous"
        onClick={handlePrevPlay}
      ></i>
      <i
        className="p-3 text-6xl hover:text-gray-700 fas fa-play"
        id="play-btn"
        onClick={handleTogglePlay}
        title="play"
      ></i>
      <i
        className="p-3 text-4xl hover:text-gray-700 fas fa-forward"
        onClick={handleNextPlay}
        title="next"
      ></i>
    </div>
  );
};
