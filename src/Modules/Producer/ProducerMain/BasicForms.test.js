import React from 'react';
import ReactDOM from 'react-dom';
import BasicForms from './BasicForms';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProducerMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});
