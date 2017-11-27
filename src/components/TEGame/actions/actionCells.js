import { SELECT_CELL } from '../constants/actionTypes';

export const selectCell = (cellIndex, symbol) => {
  return {
    type: SELECT_CELL,
    symbol,
    cellIndex,
  };
};
