import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Claims from './Claims';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Claims /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
