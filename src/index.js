import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import CompanyDetailContext from './Component/Context/companyDetailContext';
import AllStateContext from './Component/Context/allStateContext';
import EstimatestateContext from './Component/Context/EstimatestateContext';
import StocksContext from './Component/Context/StocksContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EstimatestateContext>
    <StocksContext >
      <AllStateContext>
        <CompanyDetailContext>
          <App />
        </CompanyDetailContext>
      </AllStateContext>
      </StocksContext>
    </EstimatestateContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
