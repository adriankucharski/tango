import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../../components/Board';
import { API_URL } from '../../hooks/useGlobalContext';
import { BoardType } from '../BoardList';

const WorkBoard = () => {
  const { boardID, boardName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${API_URL}/board/all`)
      .then(r => {
        const data: BoardType[] = r.data;
        if (!data.some(el => `${el.id}` === boardID && el.name === boardName))
          navigate('/');
      });
  }, []);

  return (
    <main className="bg-trello h-[100vh] w-[fit-content] min-w-full">
      <Board />
    </main>
  );
}

export default WorkBoard;
