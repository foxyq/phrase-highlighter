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
describe('handleSubmit behavior', () => {
  it('prevents default', () => {
    const Component = renderer.create(<App />);
    const preventDefault = jest.fn();
    const event = {
      preventDefault,
      target: {
        highlights: {
          value: 'Foo'
        },
        text: {
          value: 'Bar'
        }
      }
    };

    Component.getInstance().handleSubmit(event);

    expect(preventDefault).toBeCalled();
  });

  it('preserves state when given empty input', () => {
    const Component = renderer.create(<App />);
    const preventDefault = jest.fn();
    const event = {
      preventDefault,
      target: {
        highlights: {
          value: ''
        },
        text: {
          value: ''
        }
      }
    };

    Component.getInstance().handleSubmit(event);

    const text = Component.getInstance().state.text;

    expect(text).toEqual(initState.text);
  });

  it('changes state to non-empty input', () => {
    const Component = renderer.create(<App />);
    const preventDefault = jest.fn();
    const event = {
      preventDefault,
      target: {
        highlights: {
          value: ''
        },
        text: {
          value: 'new text'
        }
      }
    };

    Component.getInstance().handleSubmit(event);

    const text = Component.getInstance().state.text;

    expect(text).toEqual('new text');
  });
});
