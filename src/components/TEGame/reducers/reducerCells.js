import { SELECT_CELL } from '../constants/actionTypes';

const initialState = Array.from(new Array(9).keys());

const gameCells = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CELL:
      return state.map(
        (cell, i) => (i === action.cellIndex ? action.symbol : cell),
      );
    default:
      return state;
  }
};

export default gameCells;
