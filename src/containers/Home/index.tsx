
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../hooks/useGlobalContext'
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
      .catch(e => {
        console.log(e);
        setBoards([]);
      });
  }, []);

  console.log(boards);

  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      {boards === null ? <Loader type="Puff" /> : <BoardsList boards={boards} />}
    </main>
  );
}

export default Main;
