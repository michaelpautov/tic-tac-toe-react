import React from 'react';
import TEStart from './TEStart';
import TEScheme from './TEScheme';
import TEWinner from './TEWinner';

class TEGame extends React.Component {
  render() {
    return (
      <div>
        <TEStart />
        <TEScheme />
        <TEWinner />
      </div>
    );
  }
}

export default TEGame;
