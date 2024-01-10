import path from 'path';
import { BadRequestException } from '@nestjs/common';

export const audioFileFilter = (
  req,
  file,
  callback: (error: Error | null, acceptFile: boolean) => void
) => {
  const allowedExtensions = ['.mp3', '.ogg', '.m4a'];
  const ext = path.parse(file.originalname).ext;

  if (allowedExtensions.includes(ext)) {
    return callback(null, true);
  } else {
    return callback(
      new BadRequestException('Only audio files (mp3, ogg, m4a) are allowed!'),
      false
    );
  }
};
