import React from 'react';
import { MusicPlayer } from '../widget/MusicPlayer';
import { useActions } from '../hooks/action';

export const HomePage = () => {
  const { getAllMusics } = useActions();
  getAllMusics();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MusicPlayer />
    </div>
  );
};
