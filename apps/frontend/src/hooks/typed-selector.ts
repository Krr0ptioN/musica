import { ReducerStoreState } from '@musica/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<ReducerStoreState> =
  useSelector;
