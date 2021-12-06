
import React, { useEffect } from 'react';
import Board from '../../components/Board';
import { useNavigate, useSearchParams } from 'react-router-dom';

const WorkBoard = () => {

  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      <Board />
    </main>
  );
}

export default WorkBoard;
