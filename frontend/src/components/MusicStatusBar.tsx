import React, { useEffect, useState } from 'react';

interface MusicStatusBar {
  duration: number;
  status: string;
}

export const MusicStatusBar: React.FC<MusicStatusBar> = ({
  duration,
  status,
}) => {
  const [statusBar, setStatusBar] = useState<number>(parseFloat(status));

  useEffect(() => {
    setStatusBar(parseFloat(status));
  }, [status]);
  return (
    <div className="bg-black cursor-pointer rounded-[5px] mx-[40px] my-[20px] h-[4px] w-[90%]">
      <input
        type="range"
        min="1" max="100"
        value={statusBar}
        className={`rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128`}
      ></input>
      <div className="flex relative flex-row justify-between font-mono bottom-[30px]">
        <span>0:00</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};
