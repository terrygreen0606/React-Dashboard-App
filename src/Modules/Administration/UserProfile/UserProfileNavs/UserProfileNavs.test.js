import React from 'react';
import ReactDOM from 'react-dom';
import UserProfilenavs from './UserProfilenavs';
import {mount} from 'enzyme/build';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProfilenavs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('toggle click without crashing', () => {
  const wrapper = mount(<UserProfilenavs />);
  for (let pane=0; pane<4; pane++) {
    for( let tabId=1; tabId<4; tabId++) {
      let Tab = wrapper.find('.nav-tabs .nav-item .nav-link').at((3*pane)+tabId-1);
      Tab.simulate('click');
      expect(wrapper.state().activeTab[pane]).toEqual((tabId).toString());
    }
  }
  wrapper.unmount()
});
