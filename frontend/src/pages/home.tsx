import React from 'react';
import { MusicPlayer } from '../widget/MusicPlayer';
import { useActions } from '../hooks/action';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const { getAllMusics } = useActions();
  getAllMusics();
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MusicPlayer />
    </div>
  );
};
