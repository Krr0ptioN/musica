import crypto from 'crypto';
import * as path from 'path';

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};

/** Generating music filename based on music filename
 * @param file - Mutler object file which provide original filename
 * @returns Generated filename to be used in database and saved file
 */
const musicFileName = (file: Express.Multer.File): string => {
  const currentDateInMillisAsString = new Date().toISOString();
  return `${currentDateInMillisAsString}-${path
    .parse(file.originalname)
    .name.replace(' ', '-')
    .toLowerCase()}-${generateRandomString(8)}${path.parse(file.originalname).ext
    }`;
};

export default musicFileName;
