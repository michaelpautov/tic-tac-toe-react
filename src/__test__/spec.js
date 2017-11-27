import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TESchemeGame, { TEScheme } from '../components/TEGame/TEScheme/TEScheme';
import reducers from '../components/TEGame/reducers';
import {
  selectAiSymbol,
  selectPlayerSymbol,
} from '../components/TEGame/actions/actionSymbol';
import { selectCell } from '../components/TEGame/actions/actionCells';

const getSettings = () => {
  const mockStore = createStore(reducers);
  let wrapper = mount(
    <Provider store={mockStore}>
      <TESchemeGame />
    </Provider>
  );
  return { mockStore, wrapper };
};

describe('Tests game', () => {
  // wrapper.update() is running ai move
  it('+++ game lose', () => {
    const { mockStore, wrapper } = getSettings();
    mockStore.dispatch(selectPlayerSymbol('X'));
    mockStore.dispatch(selectAiSymbol('O'));
    mockStore.dispatch(selectCell(0, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(8, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(6, 'X'));
    wrapper.update();
    let state = mockStore.getState();
    expect(state.gameSymbols.winner.playerSymbol).equal('O');
  });

  it('+++ tie game', () => {
    const { mockStore, wrapper } = getSettings();
    mockStore.dispatch(selectPlayerSymbol('X'));
    mockStore.dispatch(selectAiSymbol('O'));
    mockStore.dispatch(selectCell(4, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(2, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(3, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(1, 'X'));
    wrapper.update();
    mockStore.dispatch(selectCell(8, 'X'));
    wrapper.update();
    let state = mockStore.getState();
    expect(state.gameSymbols.winner).equal(true);
  });

  // it('+++ check prop By TEScheme component', () => {
  // });
});
