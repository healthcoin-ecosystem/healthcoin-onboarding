import React from 'react';
import ReactDOM from 'react-dom';
import * as client from './client';
import App from './components/App';

client.init(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
