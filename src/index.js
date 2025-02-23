import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
      <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
