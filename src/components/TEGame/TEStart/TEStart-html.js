import styled from 'styled-components';

export const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

export const PopupDialog = styled.div`
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background: rgba(0, 255, 237, 0.9);
  border-radius: 5px;
`;

export const PopupText = styled.div`
  font-size: 24px;
  text-align: center;
`;

export const PopupButton = styled.button`
  width: 100px;
  height: 100px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 70px;
  cursor: pointer;
  background: transparent;
  border: 0;
  opacity: 0.7;
  transition: 0.15s;
  &:hover {
    outline: none;
    opacity: 1;
  }
  &:focus {
    outline: none;
    opacity: 1;
  }
`;
