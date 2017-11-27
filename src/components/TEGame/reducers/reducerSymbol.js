import {
  SELECT_PLAYER_SYMBOL,
  SELECT_AI_PLAYER_SYMBOL,
  SET_WINNER,
} from '../constants/actionTypes';

const initialState = {
  human: null,
  ai: null,
  winner: null,
};

const gameSymbols = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_AI_PLAYER_SYMBOL:
      return Object.assign({}, state, { ai: action.symbol });
    case SELECT_PLAYER_SYMBOL:
      return Object.assign({}, state, { human: action.symbol });
    case SET_WINNER:
      return Object.assign({}, state, { winner: action.gameWon });
    default:
      return state;
  }
};

export default gameSymbols;
