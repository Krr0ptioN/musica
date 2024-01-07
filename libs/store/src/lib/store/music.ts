import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';
import { MusicsState } from '../reducers/music.reducer';

export interface ReducerStoreState {
  musics: MusicsState;
}
export const store = createStore(reducers, {}, applyMiddleware(thunk));
