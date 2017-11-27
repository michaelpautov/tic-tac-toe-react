import {
  SELECT_AI_PLAYER_SYMBOL,
  SELECT_PLAYER_SYMBOL,
  SET_WINNER,
} from '../constants/actionTypes';

export const selectPlayerSymbol = symbol => {
  return {
    type: SELECT_PLAYER_SYMBOL,
    symbol,
  };
};

export const selectAiSymbol = symbol => {
  return {
    type: SELECT_AI_PLAYER_SYMBOL,
    symbol,
  };
};

export const setWinner = gameWon => {
  return {
    type: SET_WINNER,
    gameWon,
  };
};
