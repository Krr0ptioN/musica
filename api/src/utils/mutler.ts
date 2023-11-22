import { ConfigService } from '@nestjs/config';
import config from '../configs/config';

const configService = new ConfigService();

export const audioFileFilter = (req, file, callBack) => {
  if (file.originalname.match(/\.(mp3|ogg|m4a)$/)) {
    return callBack(new Error('Only audio files are allowed!'), false);
  }
  callBack(null, true);
};

import crypto from 'crypto';
import * as path from 'path';

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};

/** Generating music filename based on music filename
 * @param file - Mutler object file which provide original filename
 * @returns Generated filename to be used in database and saved file
 */
export const musicFileName = (file: Express.Multer.File): string => {
  const currentDateInMillisAsString = new Date().toISOString();
  return `${currentDateInMillisAsString}-${path
    .parse(file.originalname)
    .name.replace(' ', '-')
    .toLowerCase()}-${generateRandomString(8)}${path.parse(file.originalname).ext
    }`;
};

export function multerDiskStorageDestination(
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void
) {
  const musicStorageDestEnv = configService.get<string>('');
  callback(null, musicStorageDestEnv || config.storage.musicStorageDest);
}

export const multerDiskStorageFilename = (req, file, callBack) => {
  callBack(null, musicFileName(file));
};
