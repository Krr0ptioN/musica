import { MusicPlayer, useActions } from '@musica/ui-shared';

export const HomePage = () => {
  const { getAllMusics } = useActions();
  getAllMusics();
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <MusicPlayer />
    </div>
  );
};
