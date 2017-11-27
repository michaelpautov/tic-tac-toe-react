import React from 'react';
import { connect } from 'react-redux';
import { selectCell } from '../actions/actionCells';
import { TESchemeTable } from './TESchemeTable';
import { setWinner } from '../actions/actionSymbol';

export const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
];

const mapStateToProps = state => {
  return {
    gameSymbols: state.gameSymbols,
    gameCells: state.gameCells,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: (cells, cellIndex, symbol) => {
      if (cells[cellIndex] === 'X' || cells[cellIndex] === 'O') return;
      dispatch(selectCell(cellIndex, symbol));
    },
    onFindWinner: gameWon => {
      dispatch(setWinner(gameWon));
    },
  };
};

class TEScheme extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  isAIPlayerMove = (gameSymbols, gameCells) => {
    const { human, ai } = gameSymbols;
    let humanCount = 0;
    let aiPlayerCount = 0;
    gameCells.forEach(cell => {
      if (cell === human) humanCount++;
      if (cell === ai) aiPlayerCount++;
    });
    const isPlayerMove =
      (humanCount === 0 && aiPlayerCount === 0 && ai === 'X') ||
      (ai === 'X' && humanCount === aiPlayerCount) ||
      (human === 'X' && humanCount > aiPlayerCount);
    return isPlayerMove;
  };

  checkWinners(player) {
    return this.checkWin(this.cells, player) || this.checkTie();
  }

  checkWin(board, playerSymbol) {
    const playerCells = board.reduce(
      (acc, cell, i) => (cell === playerSymbol ? acc.concat(i) : acc),
      [],
    );
    const hasCombo = (combo): boolean =>
      combo.every(elem => playerCells.indexOf(elem) > -1);
    let gameWon = false;
    winCombos.forEach((combo, winComboIndex) => {
      if (hasCombo(combo)) {
        gameWon = { winComboIndex, playerSymbol };
      }
    });
    return gameWon;
  }

  checkTie(): boolean {
    const emptySquares = this.getEmptySquares();
    return emptySquares.length === 0 && !this.winner;
  }

  getEmptySquares() {
    return this.cells.filter((cell, i) => cell === i);
  }

  checkAIMoveAndWinners() {
    const { gameSymbols, gameCells, onCellClick, onFindWinner } = this.props;
    const { human, ai, winner } = gameSymbols;
    if (winner) return;
    this.cells = this.props.gameCells;
    this.winner = this.props.gameSymbols.winner;
    this.AIPlayerSymbol = this.props.gameSymbols.ai;
    this.humanPlayerSymbol = this.props.gameSymbols.human;
    const hasHumanWinner = this.checkWinners(human);
    const hasAIWinner = this.checkWinners(ai);
    if (hasHumanWinner) {
      return onFindWinner(hasHumanWinner);
    }
    if (hasAIWinner) {
      return onFindWinner(hasAIWinner);
    }
    if (this.isAIPlayerMove(gameSymbols, gameCells)) {
      const bestCell = this.bestSquare();
      onCellClick(gameCells, bestCell, ai);
    }
  }

  bestSquare() {
    return this.minimax(this.cells, this.AIPlayerSymbol).index;
  }

  checkWins(newBoard, emptySquares) {
    if (this.checkWin(newBoard, this.humanPlayerSymbol)) {
      return { score: -1 };
    } else if (this.checkWin(newBoard, this.AIPlayerSymbol)) {
      return { score: 1 };
    } else if (emptySquares.length === 0) {
      return { score: 0 };
    }
    return false;
  }

  minimax(newBoard, player) {
    const emptySquares = this.getEmptySquares();

    const checkWins = this.checkWins(newBoard, emptySquares);
    if (checkWins) {
      // return { score }
      return checkWins;
    }

    const moves = [];
    for (let i = 0; i < emptySquares.length; i++) {
      const move = this.createMove(newBoard, emptySquares, i, player);
      const isBetterScore = (symbol, score) =>
        player === symbol && move.score === score;
      if (
        isBetterScore(this.AIPlayerSymbol, 1) ||
        isBetterScore(this.humanPlayerSymbol, -1)
      ) {
        return move;
      } else {
        moves.push(move);
      }
    }

    const getBestMove = bestScoreInit =>
      moves.reduce(
        (bestScore, move) => {
          return move.score > bestScore.score ? move : bestScore;
        },
        { score: bestScoreInit },
      );
    if (player === this.AIPlayerSymbol) {
      return getBestMove(-2);
    }
    return getBestMove(2);
  }

  createMove(newBoard, emptySquares, i, player) {
    const move = {};
    move.index = newBoard[emptySquares[i]];
    newBoard[emptySquares[i]] = player;
    const getScoreBy = symbol => this.minimax(newBoard, symbol).score;
    move.score =
      player === this.AIPlayerSymbol
        ? getScoreBy(this.humanPlayerSymbol)
        : getScoreBy(this.AIPlayerSymbol);
    newBoard[emptySquares[i]] = move.index;
    return move;
  }

  componentDidUpdate() {
    this.checkAIMoveAndWinners();
  }

  render() {
    const { gameSymbols, gameCells, onCellClick } = this.props;
    return TESchemeTable(gameSymbols, gameCells, onCellClick);
  }
}

const TESchemeGame = connect(mapStateToProps, mapDispatchToProps)(TEScheme);

export default TESchemeGame;
