import fs from 'fs';
import crypto from 'crypto';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { ENV_NAME } from '../config/env/names.enum';

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};

const uploadDirectoryExistanceAssurance = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    const logger = new Logger('MusicController');
    logger.log(`Directory '${dir}' created successfully.`);
  }
};

/** Generating music filename based on music filename
 * @param file - Mutler object file which provide original filename
 * @returns Generated filename to be used in database and saved file
 */
export const fileNameGenerator = (file: Express.Multer.File): string => {
  const currentDateInMillisAsString = new Date().toISOString();
  return `${currentDateInMillisAsString}-${path
    .parse(file.originalname)
    .name.replace(' ', '-')
    .toLowerCase()}-${generateRandomString(8)}${path.parse(file.originalname).ext
    }`;
};

export function multerDiskStorageMusicAudioFileDestination(
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void
) {
  const musicStorageDestEnv = process.env[ENV_NAME.STORAGE_DEST] + '/musics';
  uploadDirectoryExistanceAssurance(musicStorageDestEnv);
  callback(null, musicStorageDestEnv);
}

export function multerDiskStorageMusicCoverFileImageDestination(
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void
) {
  const musicCoverStorageDestEnv =
    process.env[ENV_NAME.STORAGE_DEST] + '/covers';
  uploadDirectoryExistanceAssurance(musicCoverStorageDestEnv);
  callback(null, musicCoverStorageDestEnv);
}

export const multerDiskStorageFilename = (req, file, callBack) => {
  callBack(null, fileNameGenerator(file));
};
