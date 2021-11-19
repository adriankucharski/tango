
import React, { useEffect, useState } from 'react';

const Main = () => {
  const [apiData, setApiData] = useState<string>('Czekam na serwer');
  useEffect(() => {
    fetch('https://146.59.45.158:8080/test')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => setApiData(error.toString()));
  }, [apiData]);

  return (
    <h1 className="text-sm h-14 w-[300px] hover:text-white">{apiData}</h1>
  );
}

export default Main;
