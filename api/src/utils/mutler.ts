import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import config from '../configs/config';
import crypto from 'crypto';
import * as path from 'path';
import { MusicController } from '../music/music.controller';
import { BadRequestException, Logger } from '@nestjs/common';

const configService = new ConfigService();

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

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};

const uploadDirectoryExistanceAssurance = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    const logger = new Logger(MusicController.name);
    logger.log(`Directory '${dir}' created successfully.`);
  }
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
  const musicStorageDestEnv = configService.get<string>('MUSIC_STORAGE');
  uploadDirectoryExistanceAssurance(musicStorageDestEnv);
  callback(null, musicStorageDestEnv || config.storage.musicStorageDest);
}

export const multerDiskStorageFilename = (req, file, callBack) => {
  callBack(null, musicFileName(file));
};
