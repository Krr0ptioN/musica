/* eslint-disable-next-line */
export interface MusicPlayerBtnProps {
  title: string;
  className?: string;
  handlerOnClick: () => void;
}

export function MusicPlayerBtn(props: MusicPlayerBtnProps) {
  return (
    <i
      className={`${props.className} p-3 hover:text-gray-700`}
      title={props.title}
      onClick={props.handlerOnClick}
    ></i>
  );
}

export default MusicPlayerBtn;
