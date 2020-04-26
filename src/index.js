import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Graph from './Graph';
import ContactCard from './ContactCard';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Graph />
    <ContactCard />
  </React.StrictMode>,
  document.getElementById('root')
);

//https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.register();
