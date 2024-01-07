import React from 'react';

interface MusicCoverProps {
  handlerMusicSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  duration: string;
}

export const MusicPlayerProgressBar = ({
  handlerMusicSeek,
  duration,
}: MusicCoverProps) => {
  return (
    <div className="flex relative flex-col p-5 w-full font-mono">
      <input
        type="range"
        min="1"
        max="100"
        defaultValue="40"
        onChange={handlerMusicSeek}
        className="slider"
      ></input>
      <div className="flex flex-row justify-between">
        <span>0:00</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};
