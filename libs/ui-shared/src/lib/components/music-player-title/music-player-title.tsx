/* eslint-disable-next-line */
export interface MusicPlayerTitleProps {
  name: string;
  artists: string[];
}

export function MusicPlayerTitle(props: MusicPlayerTitleProps) {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <span className="text-2xl font-extrabold">{props.name}</span>
      <span className="text-xl font-light">{props.artists[0]}</span>
    </div>
  );
}

export default MusicPlayerTitle;
