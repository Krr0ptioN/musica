import { ActionTypes } from '../constants/action-type';

export const pauseMusic = () => {
  return {
    type: ActionTypes.PAUSE_MUSIC,
  };
};
