export * from './next-music.action';
export * from './prev-music.action';
export * from './play-music.action';
export * from './pause-music.action';
export * from './select-music.action';

export interface MusicAction {
  type: string;
  payload: object;
}
