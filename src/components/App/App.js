import React from 'react';

import TEGame from '../TEGame';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../TEGame/reducers';

const store = createStore(reducers);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TEGame />
      </Provider>
    );
  }
}

export default App;
