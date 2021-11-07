import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [apiData, setApiData] = useState<string>('Czekam na serwer');

  useEffect(() => {
    fetch('http://146.59.45.158:8080/test')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => setApiData(error.toString()));
  }, [apiData]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{apiData}</p>
      </header>
    </div>
  );
}

export default App;
