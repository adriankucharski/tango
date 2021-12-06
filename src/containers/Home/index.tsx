
import React, { useEffect, useState } from 'react';
import Board from '../../components/Board';
import axios from 'axios';
import { API_URL, TOKEN_ALS_NAME, GlobalContext } from '../../hooks/useGlobalContext'
import Loader from 'react-loader-spinner';
import BoardsList, { BoardType } from '../BoardList';


const Main = () => {
  const [boards, setBoards] = useState<BoardType[] | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/board/all`)
      .then(r => {
        const { data } = r;
        setBoards(data);
      })
      .catch(e => console.log(e));
  }, []);

  console.log(boards);

  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      {boards === null ? <Loader type="Puff" /> : <BoardsList boards={boards} />}
    </main>
  );
}

export default Main;
