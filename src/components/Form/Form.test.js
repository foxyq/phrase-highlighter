import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Form from './Form';

describe('Form component', () => {
  const mockFn = () => {};

  it('matches snapshot', () => {
    const Component = renderer.create(<Form handleSubmit={mockFn} />).toJSON();
    expect(Component).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form handleSubmit={mockFn} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
