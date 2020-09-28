import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import Claim from './Claim';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Claim /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
