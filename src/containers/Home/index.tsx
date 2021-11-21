
import React, { useEffect, useState } from 'react';
import Board from '../../components/Board';

const Main = () => {
  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      <Board />
    </main>
  );
}

export default Main;
