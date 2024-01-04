import { Music } from '@musica/types';
import { ActionTypes } from '../constants/action-type';

interface EditMusicAction {
  music: Music;
  id: number;
}
export const editMusic = ({ id, music }: EditMusicAction) => {
  return {
    type: ActionTypes.EDIT_MUSIC,
    payload: { id, music },
  };
};
