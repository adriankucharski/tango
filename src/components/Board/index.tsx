import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AddListForm from '../AddListForm';
import DroppableList from '../DroppableList';
import Loader from "react-loader-spinner";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { API_URL, AuthContext } from "../../hooks/useAuth";
import { Toast } from 'react-bootstrap';

type BoardProps = {

};

type BackendBoardColumns = {
  id: string;
  name: string;
  items: {
    id: string;
    content: string;
  }[];
};

type ToastMsg = {
  variant: string;
  message: string;
}

const Board = ({ }: BoardProps) => {
  const { authState } = useContext(AuthContext);
  const [columns, setColumns] = useState<BackendBoardColumns[]>([]);
  const [toastNode, setToastNode] = useState<ToastMsg | null>(null);

  useEffect(() => {
    const dataGetter = async () => {
      console.log(axios.defaults.headers);
      await axios.get(`${API_URL}/board/all`)
        .then(r => {
          const { data } = r;
          setToastNode({
            variant: 'success',
            message: `Board loaded`
          });
        })
        .catch(e => {
          setToastNode({
            variant: 'danger',
            message: `${e}`
          });
        })
    }
    const backendColumns: BackendBoardColumns[] = [];
    for (let i = 0; i < 4; ++i) {
      backendColumns.push(
        {
          id: `${i}`,
          name: `Column ${i}`,
          items: [{
            id: `${i}`,
            content: `Row ${i}`
          }]
        }
      );
    }

    setTimeout(() => setColumns(backendColumns), 1000);
    // dataGetter();
  }, []);



  const submitFormCallback = useCallback((name: string): Promise<string> =>
    new Promise(async () => {
      const body = { name: name }
      await axios.post(`${API_URL}/board/all`, body)
        .then(r => {
          const { data } = r;
          setToastNode({
            variant: 'success',
            message: `Added new a list: ${name}`
          });
        })
        .catch(e => {
          setToastNode({
            variant: 'danger',
            message: `${e}`
          });
        })
    }), []);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newColumns = [...columns];
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = newColumns.find((e: BackendBoardColumns) => e.id === source.droppableId);
      const destColumn = newColumns.find((e: BackendBoardColumns) => e.id === destination.droppableId);
      const destItems = destColumn?.items;
      //@ts-ignore
      const [removed] = sourceColumn.items.splice(source.index, 1);
      destItems?.splice(destination.index, 0, removed);
    } else {
      const column = newColumns.find((e: BackendBoardColumns) => e.id === source.droppableId);
      column && ([column.items[source.index], column.items[destination.index]] = [column.items[destination.index], column.items[source.index]]);
    }
    setColumns(newColumns);
  }, [columns]);

  return (
    <div>
      <div className="flex">
        {columns.length > 0 ?
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {columns.map((column, index) =>
              <DroppableList key={index} id={column.id} name={column.name} items={column.items} />
            )}
          </DragDropContext>
          :
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        }
        <div>
          <AddListForm
            openButtonName="+ Add a list"
            addButtonName="Add list"
            closeButtonName="Close"
            placeholder="Enter list title..."
            submitFormCallback={submitFormCallback}
            className="w-[272px] m-2"
            buttonTextColor="text-white"
          />
          <Toast className="!w-[272px] m-2" bg={toastNode?.variant} onClose={() => setToastNode(null)} show={Boolean(toastNode)} delay={2000} autohide>
            <Toast.Header>
              <strong className="me-auto">Status</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body>{toastNode?.message}</Toast.Body>
          </Toast>
        </div>
      </div>
    </div>
  )
};

export default Board;
export type { BackendBoardColumns };
