interface BtnProps {
  title: string;
  className: string;
  handlerOnClick: () => void;
}

export const Btn: React.FC<BtnProps> = ({
  title,
  className,
  handlerOnClick,
}: BtnProps) => {
  return (
    <i
      className={`${className} p-3 hover:text-gray-700`}
      title={title}
      onClick={handlerOnClick}
    ></i>
  );
};
