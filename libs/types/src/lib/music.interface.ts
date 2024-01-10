export interface IMusic {
  artists: string[];
  album: string | undefined;
  name: string;
  musicFile: string | undefined;
  musicCover: string | undefined;
  musicAudioFileName: string;
  coverImageFileName: string;
  playlists: string[] | undefined;
  id: string;
}
