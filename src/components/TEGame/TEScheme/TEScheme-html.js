import styled from 'styled-components';

export const Tr = styled.tr`
  font-size: 70px;
`;

export const Td = styled.td`
  width: 100px;
  height: 100px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 2px solid #333;
  &.winner-cell {
    background: red;
  }
`;

export const Table = styled.table`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -155px;
  margin-left: -155px;
  border-collapse: collapse;
  ${Tr.selector}:first-child ${Td.selector} {
    border-top: 0;
  }

  ${Tr.selector}:last-child ${Td.selector} {
    border-bottom: 0;
  }

  ${Tr.selector} ${Td.selector}:first-child {
    border-left: 0;
  }
  ${Tr.selector} ${Td.selector}:last-child {
    border-right: 0;
  }
`;
