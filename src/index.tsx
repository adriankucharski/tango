import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './app_tailwind.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './containers/Navigation';

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <Navigation />
      <App />
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
