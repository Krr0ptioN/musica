/* eslint-disable-next-line */

import { useState } from 'react';

export interface MusicPlayerProgressBarProps {
  handlerMusicSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  duration: string;
}

export function MusicPlayerProgressBar(props: MusicPlayerProgressBarProps) {
  const [progress, setProgress] = useState();

  return (
    <div className="flex relative flex-col p-5 w-full font-mono">
      <input
        type="range"
        min="1"
        max="100"
        defaultValue="40"
        onChange={props.handlerMusicSeek}
        className="slider"
      ></input>
      <div className="flex flex-row justify-between">
        <span>{progress}</span>
        <span>{props.duration}</span>
      </div>
    </div>
  );
}

export default MusicPlayerProgressBar;
