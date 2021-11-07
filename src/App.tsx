import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [apiData, setApiData] = useState<string>('Czekam na serwer');

  useEffect(() => {
    fetch('')
      .then(response => {
        if (response.ok)
          return response.json();
      })
      .then(data => setApiData(data));
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
