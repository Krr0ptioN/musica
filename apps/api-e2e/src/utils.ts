import path from 'path';
import fs from 'fs';

export const fileStreamByPath = (filePath: string) => {
  const cwd = process.cwd();
  const absolutePathToFile = path.resolve(cwd, filePath);
  return fs.createReadStream(absolutePathToFile);
};
