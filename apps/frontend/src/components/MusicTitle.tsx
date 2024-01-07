interface MusicTitleProps {
  name: string;
  artists: string[];
}

export const MusicTitle = ({ name, artists }: MusicTitleProps) => {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <span className="text-2xl font-extrabold">{name}</span>
      <span className="text-xl font-light">{artists[0]}</span>
    </div>
  );
};
