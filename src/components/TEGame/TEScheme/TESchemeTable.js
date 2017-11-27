import React from 'react';
import { Table, Tr, Td } from './TEScheme-html';
import { winCombos } from './TEScheme';

const getCellIndex = (rowIndex, collIndex) => {
  return rowIndex * 3 + collIndex;
};

const convertCells = gameCells => {
  const convertedCells = [];
  for (let i = 0; i < gameCells.length; i += 3) {
    const row = [];
    for (let j = i; j < i + 3; j++) {
      row.push(gameCells[j]);
    }
    convertedCells.push(row);
  }
  return convertedCells;
};

const convertCell = (cell, winnerSymbol) => {
  if (cell === 'W') {
    return winnerSymbol;
  }
  return cell === 'X' || cell === 'O' ? cell : '';
};

const isWinnerIndex = (winIndex, index) => {
  return winCombos[winIndex].indexOf(index) !== -1;
};

const tableRows = (gameSymbols, gameCells, onCellClick) =>
  convertCells(gameCells, gameSymbols.winner).map((row, rowIndex) => {
    const cells = [];
    row.forEach((cell, collIndex) => {
      const { human, winner } = gameSymbols;
      const cellIndex = getCellIndex(rowIndex, collIndex);
      let isWinIndex = false;
      if (winner && winner.winComboIndex) {
        isWinIndex = isWinnerIndex(winner.winComboIndex, cellIndex);
      }
      const convertedCell = convertCell(cell);
      cells.push(
        <Td
          className={isWinIndex ? 'winner-cell' : ''}
          key={cellIndex}
          onClick={e => {
            e.preventDefault();
            onCellClick(gameCells, cellIndex, human);
          }}
        >
          {convertedCell}
        </Td>,
      );
    });
    return <Tr key={rowIndex}>{cells}</Tr>;
  });

export const TESchemeTable = (gameSymbols, gameCells, onCellClick) => (
  <Table>
    <tbody>{tableRows(gameSymbols, gameCells, onCellClick)}</tbody>
  </Table>
);
