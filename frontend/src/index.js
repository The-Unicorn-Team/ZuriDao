import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/reset.css';
import './assets/css/index.css';
import './assets/css/base.css';
import App from './pages/App';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import 'aos/dist/aos.css';//../../../node_modules/

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
