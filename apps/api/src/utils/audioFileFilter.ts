export const audioFileFilter = (req, file, callBack) => {
  if (file.originalname.match(/\.(mp3|ogg|m4a)$/)) {
    return callBack(new Error('Only audio files are allowed!'), false);
  }
  callBack(null, true);
};
