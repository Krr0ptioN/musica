import { Music } from '@musica/types';
import { ActionTypes } from '../constants/action-type';
import { Dispatch } from 'react';
import { MusicAction } from '../actions';
import { musicaAxios } from '@musica/utils';

export const getAllMusics = () => {
  return async (dispatch: Dispatch<MusicAction>) => {
    const { data } = await musicaAxios.get('music');
    data.data.forEach(async (obj) => {
      const response = await musicaAxios.get(`/music/file/${obj.id}`, {
        responseType: 'blob',
      });
      const blobData: Blob = response.data;

      const file: File = new File([blobData], obj.fileName, {
        type: 'audio/mpeg',
      });

      const music: Music = {
        artists: obj.artistIds,
        album: obj.albumIds,
        name: obj.name,
        playlists: obj.playlistIds,
        fileName: obj.fileName,
        id: obj.id,
        file,
      };

      dispatch({
        type: ActionTypes.ADD_MUSIC,
        payload: { music },
      });
    });
  };
};
