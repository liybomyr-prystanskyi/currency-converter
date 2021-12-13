import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CurrencyConversionPage from './components/CurrencyConversionPage/CurrencyConversionPage'
import HistoryRatePage from './components/HistoryRatePage/HistoryRatePage'
import ComparisonPage from './components/ComparisonPage/ComparisonPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CurrencyConversionPage />} />
          <Route path="crurrency-conversion" element={<CurrencyConversionPage />} />
          <Route path="history-rete" element={<HistoryRatePage />} />
          <Route path="comparison" element={<ComparisonPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
