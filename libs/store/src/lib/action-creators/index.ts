import { IMusic } from '@musica/types';
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
        const responseAudio = await musicaAxios.get(`/music/${obj.id}/file`, {
          responseType: 'blob',
        });
        const responseCover = await musicaAxios.get(`/music/${obj.id}/cover`, {
          responseType: 'blob',
        });
        const musicAudioBlobData: Blob = responseAudio.data;

        const musicFileBlob: File = new File(
          [musicAudioBlobData],
          obj.fileName,
          {
            type: 'audio/mpeg',
          }
        );

        const musicCoverBlobData: Blob = responseCover.data;

        const musicCoverBlob: File = new File(
          [musicCoverBlobData],
          obj.fileName,
          {
            type: 'audio/mpeg',
          }
        );
        const musicFileURL = URL.createObjectURL(musicFileBlob);
        const musicCoverURL = URL.createObjectURL(musicCoverBlob);
        const music: IMusic = {
          artists: obj.artistIds,
          album: obj.albumIds,
          name: obj.name,
          playlists: obj.playlistIds,
          musicAudioFileName: obj.musicAudioFileName,
          coverImageFileName: obj.coverImageFileName,
          id: obj.id,
          musicFile: musicFileURL,
          musicCover: musicCoverURL,
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

// TODO: Add music action creator for creating and adding music to library

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
