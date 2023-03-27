import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import css from'./index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className={css.App}/>
  </React.StrictMode>
);
