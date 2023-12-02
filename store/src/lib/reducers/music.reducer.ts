import { Music } from '@musica/types';
import { ActionTypes } from '../constants/action-type';

interface MusicsState {
  playing: boolean;
  selectedMusic: number;
  musics: Music[];
}

interface Action {
  type: string;
  payload?: string;
}

export const musicInitialState: MusicsState = {
  playing: false,
  selectedMusic: 0,
  musics: [],
};

interface MusicPayload {
  id: number;
  music?: Music;
}

interface ReduceActionArgs {
  state: MusicsState;
  payload?: MusicPayload;
  type: string;
}

export const musicReducer = (
  state: MusicsState = musicInitialState,
  action: ReduceActionArgs
): MusicsState => {
  const editedIndex = action.payload?.id;
  const newMusicToAdd = action.payload?.music;

  switch (action.type) {
    case ActionTypes.NEXT_MUSIC:
      return {
        ...state,
        musics: state.musics,
        playing: state.playing,
        selectedMusic: state.selectedMusic + 1,
      };

    case ActionTypes.PREV_MUSIC:
      return {
        ...state,
        musics: state.musics,
        playing: state.playing,
        selectedMusic: state.selectedMusic - 1,
      };

    case ActionTypes.PAUSE_MUSIC:
      return {
        ...state,
        musics: state.musics,
        playing: false,
        selectedMusic: state.selectedMusic,
      };

    case ActionTypes.PLAY_MUSIC:
      return {
        ...state,
        musics: state.musics,
        playing: true,
        selectedMusic: state.selectedMusic,
      };

    case ActionTypes.SELECT_MUSIC:
      return {
        ...state,
        musics: state.musics,
        playing: state.playing,
        selectedMusic: action.payload?.id || state.selectedMusic,
      };

    case ActionTypes.ADD_MUSIC:
      if (newMusicToAdd) {
        return {
          ...state,
          musics: [...state.musics, newMusicToAdd],
          playing: state.playing,
          selectedMusic: state.selectedMusic,
        };
      } else {
        return state;
      }

    case ActionTypes.EDIT_MUSIC:
      if (
        editedIndex !== undefined &&
        editedIndex >= 0 &&
        editedIndex < state.musics.length
      ) {
        const updatedMusics = state.musics.map((music, index) =>
          index === editedIndex ? action.payload?.music || music : music
        );

        return {
          ...state,
          musics: updatedMusics,
          playing: state.playing,
          selectedMusic: state.selectedMusic,
        };
      } else {
        return state;
      }

    case ActionTypes.DELETE_MUSIC:
      return {
        ...state,
        musics: state.musics.filter((_, index) => index !== action.payload?.id),
        playing: state.playing,
        selectedMusic: state.selectedMusic,
      };

    default:
      return state;
  }
};
