import { ActionTypes } from '../constants/action-type';

export const deleteMusic = () => {
  return {
    type: ActionTypes.DELETE_MUSIC,
  };
};
