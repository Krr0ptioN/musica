import { ActionTypes } from '../constants/action-type';
import { Music } from '@musica/types';

export const addMusic = (music: Music) => {
  return {
    type: ActionTypes.ADD_MUSIC,
    payload: { music },
  };
};
