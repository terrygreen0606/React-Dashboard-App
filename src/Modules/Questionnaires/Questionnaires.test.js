import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Questionnaires from './Questionnaires';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Questionnaires /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
