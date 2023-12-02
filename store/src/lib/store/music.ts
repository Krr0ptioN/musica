import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import reducers from '../reducers/reducers';
import thunk from 'redux-thunk';

export const store = createStore(reducers, {}, applyMiddleware(thunk));
