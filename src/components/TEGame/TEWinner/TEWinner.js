import React from 'react';
import { connect } from 'react-redux';
import { WinnerPopup, WinnerWrapper } from './TEWinner-html';
import { reloadTEGame } from '../actions/actionTEGame';

const mapStateToProps = state => {
  return {
    gameSymbols: state.gameSymbols,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onWinnerPopupClick: () => {
      dispatch(reloadTEGame());
    },
  };
};

const getWinnerText = gameSymbols => {
  const { winner, ai } = gameSymbols;
  return winner.playerSymbol === ai ? 'You lose' : 'Tie Game';
};

const TEWinner = ({ gameSymbols, onWinnerPopupClick }) => {
  if (!gameSymbols.winner) {
    return null;
  }
  return (
    <WinnerWrapper onClick={() => onWinnerPopupClick()}>
      <WinnerPopup>
        <p>{getWinnerText(gameSymbols)}</p>
      </WinnerPopup>
    </WinnerWrapper>
  );
};

const TEWinnerGame = connect(mapStateToProps, mapDispatchToProps)(TEWinner);

export default TEWinnerGame;
