import React from 'react';
import ReactDOM from 'react-dom';
import ProducerNavs from './ProducerNavs';
import {mount} from 'enzyme/build';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProducerNavs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('toggle click without crashing', () => {
  const wrapper = mount(<ProcuderNavs />);
  for (let i=0; i<2; i++) {
    let ProducerNavs = wrapper.find('a.dropdown-toggle').at(i);
    ProducerNavs.simulate('click');
    expect(wrapper.state().dropdownOpen[i]).toEqual(true);
  }
  wrapper.unmount()
});
