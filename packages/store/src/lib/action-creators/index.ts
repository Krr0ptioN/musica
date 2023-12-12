import { Music } from '@musica/types';
import { ActionTypes } from '../constants/action-type';
import { Dispatch } from 'react';
import { MusicAction } from '../actions';
import { musicaAxios } from '@musica/utils';

export const getAllMusics = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    try {
      dispatch({
        type: ActionTypes.CLEAR_ALL_MUSICS,
        payload: {},
      });
      const { data } = await musicaAxios.get('music');
      const promises = data.data.map(async (obj: any) => {
        const response = await musicaAxios.get(`/music/file/${obj.id}`, {
          responseType: 'blob',
        });
        console.log('Response');
        const blobData: Blob = response.data;

        const fileBlob: File = new File([blobData], obj.fileName, {
          type: 'audio/mpeg',
        });
        const fileURL = URL.createObjectURL(fileBlob);
        const music: Music = {
          artists: obj.artistIds,
          album: obj.albumIds,
          name: obj.name,
          playlists: obj.playlistIds,
          fileName: obj.fileName,
          id: obj.id,
          file: fileURL,
        };

        return music;
      });

      const musics = await Promise.all(promises);
      const uniqueMusics = musics.filter(
        (music, index, self) =>
          index === self.findIndex((m) => m.id === music.id)
      );

      uniqueMusics.forEach((music) => {
        dispatch({
          type: ActionTypes.ADD_MUSIC,
          payload: { music },
        });
      });
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };
};

export const clearAllMusic = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    dispatch({
      type: ActionTypes.CLEAR_ALL_MUSICS,
      payload: {},
    });
  };
};

export const playCurrentMusic = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    dispatch({
      type: ActionTypes.PLAY_MUSIC,
      payload: {},
    });
  };
};

export const pauseCurrentMusic = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    dispatch({
      type: ActionTypes.PAUSE_MUSIC,
      payload: {},
    });
  };
};

export const playNextMusic = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    dispatch({
      type: ActionTypes.NEXT_MUSIC,
      payload: {},
    });
  };
};

export const playPrevMusic = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    dispatch({
      type: ActionTypes.PREV_MUSIC,
      payload: {},
    });
  };
};
