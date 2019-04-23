import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import DynamicContent from './DynamicContent';

describe('DynamicContent component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DynamicContent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const content = 'abc';

  it('renders props correctly', () => {
    const Component = renderer
      .create(<DynamicContent>{content}</DynamicContent>)
      .toJSON();
    expect(Component).toMatchSnapshot();
  });

  it('renders no props correctly', () => {
    const Component = renderer.create(<DynamicContent />).toJSON();
    expect(Component).toMatchSnapshot();
  });
});
