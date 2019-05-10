import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

import initState from '../../records/initialState';

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches snapshot', () => {
    const Component = renderer.create(<App />).toJSON();
    expect(Component).toMatchSnapshot();
  });
});

describe('onTextChange', () => {
  const evt = {
    target: {
      value: 'foo'
    }
  };

  it('extracts event value and changes state', () => {
    const Component = renderer.create(<App />);
    const instance = Component.getInstance();

    const text = instance.state.text;
    instance.onTextChange(evt);
    const newText = instance.state.text;

    expect(text).toEqual(initState.text);
    expect(newText).toEqual('foo');
  });
});

describe('onHighlightsChange', () => {
  const Component = renderer.create(<App />);
  const instance = Component.getInstance();
  const highlights = instance.state.highlights;

  it('changes state with valid input', () => {
    const evt = {
      target: {
        value:
          '[{"color":"blue", "phrases":["test", "foobar"]}, {"color":"green", "phrases":["foo", "bar"]}]'
      }
    };

    expect(highlights).toBe(initState.highlights);

    instance.onHighlightsChange(evt);

    expect(instance.state.highlights).toEqual(JSON.parse(evt.target.value));
  });

  it('does not change state with invalid input', () => {
    const evt = {
      target: {
        value: 'test'
      }
    };

    const evt2 = {
      target: {
        value: '[{"color":"blue"}]'
      }
    };
    expect(highlights).toBe(initState.highlights);
    instance.onHighlightsChange(evt);
    expect(highlights).toBe(initState.highlights);
    instance.onHighlightsChange(evt2);
    expect(highlights).toBe(initState.highlights);
  });
});

describe('onMouseOver & onMouseOut', () => {
  const evt = {
    target: {
      datahighlightindex: ['7 8 9'],
      getAttribute: function(name) {
        return this[name];
      }
    }
  };

  it('changes highlightedIndex in state to 2 and back to null', () => {
    const Component = renderer.create(<App />);
    const instance = Component.getInstance();

    expect(instance.state.highlightedIndex).toBe(null);
    instance.onMouseHover(evt);
    expect(instance.state.highlightedIndex).toBe(8);
    instance.onMouseOut();
    expect(instance.state.highlightedIndex).toBe(null);
  });
});
