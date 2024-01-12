/* eslint-disable-next-line */
export interface MusicPlayerBtnProps {
  title: string;
  className?: string;
  handlerOnClick: () => void;
}

export function MusicPlayerBtn(props: MusicPlayerBtnProps) {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      props.handlerOnClick();
    }
  };
  return (
    <i
      tabIndex={0}
      className={`${props.className} p-3 hover:text-gray-700`}
      title={props.title}
      onClick={props.handlerOnClick}
      onKeyPress={handleKeyPress}
      role="button"
      onKeyDown={handleKeyPress}
    ></i>
  );
}

export default MusicPlayerBtn;
