import React from 'react';

interface MusicCoverProps {
  src: string | undefined;
  alt?: string;
}

export const MusicCover = ({ src, alt }: MusicCoverProps) => {
  return (
    <img
      src={src}
      className="p-30 object-cover h-[60%] shadow-glass w-[80%] relative -top-[30px] rounded-xl"
      alt={alt ? alt : ''}
    />
  );
};
