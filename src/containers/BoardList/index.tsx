
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, TOKEN_ALS_NAME, GlobalContext } from '../../hooks/useGlobalContext'
import Loader from 'react-loader-spinner';
import BoardsListElement from './BoardListElement';
import Button from "react-bootstrap/Button";
import { Form, Modal } from 'react-bootstrap';
type BoardsListProps = {
  boards: BoardType[];
};

type BoardType = {
  id: number;
  name: string;
};

const BoardsList = ({ boards }: BoardsListProps) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const addNewBoardHandler = useCallback((e: React.SyntheticEvent) => new Promise(async () => {
    e.preventDefault();
    await axios.post(`${API_URL}/board`, { name: name })
      .then(r => {
        const { data } = r;
        boards.push(data as BoardType);
        setShow(false);
      })
      .catch(e => { setErrMsg("error"); console.log(e); });
    setName('');
  }), [name]);

  const onCloseModal = () => {
    setName('');
    setErrMsg('');
    setShow(false);
  }

  return (
    <div className="max-w-screen-xl mx-auto ">
      <div className="p-8 md:p-4 max-w-screen-md mx-auto text-white"><h3>Boards</h3></div>
      <div className="px-8 md:px-4 max-w-screen-md mx-auto grid grid-flow-row gap-3 sm:grid-cols-2 md:grid-cols-4">
        {boards.map((e, idx) => <BoardsListElement key={idx} id={e.id} name={e.name} />)}
        <Button className="h-[80px]" variant="light" onClick={() => setShow(true)}>Create new board</Button>
      </div>
      <Modal show={show} onHide={onCloseModal} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Create new board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addNewBoardHandler}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Add board title" onChange={(e) => setName(e.currentTarget.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create board
            </Button>
          </Form>
          {errMsg && <p className="text-red-500 pt-2 m-0">{errMsg}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BoardsList;
export type { BoardType };