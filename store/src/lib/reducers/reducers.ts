import { combineReducers } from '@reduxjs/toolkit';
import { musicReducer } from './music.reducer';

const reducers = combineReducers({
  musics: musicReducer,
});

export default reducers;
