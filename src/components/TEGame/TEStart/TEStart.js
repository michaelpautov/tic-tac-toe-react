import React from 'react';
import { connect } from 'react-redux';
import { selectAiSymbol, selectPlayerSymbol } from '../actions/actionSymbol';
import {
  PopupWrapper,
  PopupButton,
  PopupDialog,
  PopupText,
} from './TEStart-html';

const mapStateToProps = state => {
  return {
    gameSymbols: state.gameSymbols,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onButtonClick: symbol => {
      const altSymbol = symbol === 'X' ? 'O' : 'X';
      dispatch(selectPlayerSymbol(symbol));
      dispatch(selectAiSymbol(altSymbol));
    },
  };
};

const TEStart = ({ gameSymbols, onButtonClick }) => {
  if (gameSymbols.human) {
    return null;
  }
  return (
    <PopupWrapper>
      <PopupDialog>
        <PopupText>Select symbol</PopupText>
        <div>
          <PopupButton onClick={() => onButtonClick('X')}>X</PopupButton>
          <PopupButton onClick={() => onButtonClick('O')}>O</PopupButton>
        </div>
      </PopupDialog>
    </PopupWrapper>
  );
};

const TEStartGame = connect(mapStateToProps, mapDispatchToProps)(TEStart);

export default TEStartGame;
