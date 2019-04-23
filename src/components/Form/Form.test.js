import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import Form from './Form';

describe('Form component', () => {
  configure({ adapter: new Adapter() });
  it('matches snapshot', () => {
    const Component = renderer.create(<Form />).toJSON();
    expect(Component).toMatchSnapshot();
  });

  it('renders without crashing ', () => {
    const Component = renderer.create(<Form handleSubmit={() => 5} />).toJSON();
    expect(Component).toMatchSnapshot();
  });
  //

  //   it('ada', () => {
  //     const onButtonClick = sinon.spy();

  //     // expect(clickSpy.calledOnce).to.equal(true);

  //     const component = shallow(<Form handleSubmit={onButtonClick} />);
  //     component.find('input[type="submit"]').simulate('click');
  //     expect(onButtonClick.calledOnce).to.equal(true);
  //   });

  //   it('fires form submit', () => {
  //     const mockFn = jest.fn();

  //     const form = shallow(<Form onSubmit={mockFn} />);

  //     form.find('input[type="submit"]').simulate('click');
  //     form.find('input[type="submit"]').simulate('submit');

  //     expect(form.instance().onSubmit).toHaveBeenCalled();
  //     expect(mockFn).toHaveBeenCalled();
  //   });
});
