import path from 'path';
import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (
  req,
  file,
  callback: (error: Error | null, acceptFile: boolean) => void
) => {
  const allowedExtensions = ['.jpg', '.svg', '.png', '.jpeg'];
  const ext = path.parse(file.originalname).ext;

  if (allowedExtensions.includes(ext)) {
    return callback(null, true);
  } else {
    return callback(
      new BadRequestException(
        'Only audio files (jpg,jpeg,png,svg) are allowed!'
      ),
      false
    );
  }
};
