import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './app_tailwind.css';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ContextProvider } from './hooks/useGlobalContext';
import Navigation from './containers/Navigation';

ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <Navigation />
      <div className="pt-[56px]">
        <App />
      </div>
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
