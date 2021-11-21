
import React, { useEffect, useState } from 'react';
import Board from '../../components/Board';

const Main = () => {
  const [apiData, setApiData] = useState<string>('Czekam na serwer');
  useEffect(() => {
    fetch('https://146.59.45.158:8080/test')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => setApiData(error.toString()));
  }, [apiData]);


  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      <Board />
    </main>
  );
}

export default Main;
