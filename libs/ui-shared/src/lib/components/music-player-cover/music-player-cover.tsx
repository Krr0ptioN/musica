/* eslint-disable-next-line */
export interface MusicPlayerCoverProps {
  src: string | undefined;
  alt?: string;
}

export function MusicPlayerCover(props: MusicPlayerCoverProps) {
  return (
    <img
      src={props.src}
      className="p-30 object-cover h-[60%] shadow-glass w-[80%] relative -top-[30px] rounded-xl"
      alt={props?.alt}
    />
  );
}

export default MusicPlayerCover;
