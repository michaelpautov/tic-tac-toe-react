import { combineReducers } from 'redux';
import gameSymbols from './reducerSymbol';
import gameCells from './reducerCells';
import { RELOAD_TEGAME } from '../constants/actionTypes';

const appReducers = combineReducers({
  gameSymbols,
  gameCells,
});

const reducers = (state, action) => {
  if (action.type === RELOAD_TEGAME) {
    state = undefined;
  }
  return appReducers(state, action);
};

export default reducers;
