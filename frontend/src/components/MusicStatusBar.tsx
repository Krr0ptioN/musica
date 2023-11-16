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
      <div
        className={`left-0 bg-gray-100 w-[${statusBar}%] h-[100%] rounded-[5px]`}
      ></div>
      <div className="flex relative flex-row justify-between font-mono bottom-[30px]">
        <span>0:00</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};
