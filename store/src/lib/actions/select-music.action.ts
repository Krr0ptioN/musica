import { ActionTypes } from '../constants/action-type';

export const selectMusic = (id: number) => {
  return {
    type: ActionTypes.SELECT_MUSIC,
    payload: { id },
  };
};
