import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AddListForm from '../AddListForm';
import DroppableList from '../DroppableList';
import Loader from "react-loader-spinner";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { API_URL, GlobalContext } from "../../hooks/useGlobalContext";
import { Toast } from 'react-bootstrap';
import TextInput from '../TextInput';
import { useNavigate, useSearchParams } from 'react-router-dom';

type BoardProps = {

};
type CardContent = {
  id: number;
  name: string;
  listId: string;
  position: number;
  description: string;
}

type BackendBoardColumns = {
  id: number;
  name: string;
  position: number;
  items?: CardContent[];
};

type ToastMsg = {
  variant: string;
  message: string;
}

const Board = ({ }: BoardProps) => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<BackendBoardColumns[]>([]);
  const [toastNode, setToastNode] = useState<ToastMsg | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [boardID, setBoardID] = useState<string | null>(searchParams.get('id'));
  const [boardName, setBoardName] = useState<string | null>(searchParams.get('name'));


  useEffect(() => {
    (!boardID && !boardName) && navigate('/tango');
  }, []);

  useEffect(() => {
    const dataList = async () => {
      await axios.get(`${API_URL}/board/${boardID}/list`)
        .then(r => {
          const { data } = r;
          setColumns(data);
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
    };
    dataList();
  }, []);

  useEffect(() => {
    const dataCard = () => {
      columns.forEach(async column => {
        await axios.get(`${API_URL}/board/${boardID}/list/${column.id}/card`)
          .then(r => {
            column.items = r.data;
            console.log(r.data)
          })
          .catch(e => {
            setToastNode({
              variant: 'danger',
              message: `${e}`
            });
          });
      });
    };
    dataCard();
  }, [columns]);

  const submitFormCallback = useCallback((name: string): Promise<string> =>
    new Promise(async () => {
      const body = { name: name }
      await axios.post(`${API_URL}/board/${boardID}/list`, body)
        .then(r => {
          const { data } = r;
          setColumns([...columns, data]);
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
    }), [columns]);

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
      column && column.items && ([column.items[source.index], column.items[destination.index]] = [column.items[destination.index], column.items[source.index]]);
    }
    setColumns(newColumns);
  }, [columns]);

  const submitNameChange = useCallback(async (newName: string) => {
    await axios.put(`${API_URL}/board`, { name: newName }, { params: { id: `${boardID}` } })
      .then(() => {
        const params = new URLSearchParams(`id=${boardID}&name=${newName}`);
        window.history.replaceState(null, '', `board?${params.toString()}`);
        setBoardName(newName);
      })
      .catch(e => {
        setToastNode({
          variant: 'danger',
          message: `Cannot change the name`
        });
        console.log(e);
      });
  }, []);

  return (
    <div>
      <TextInput name={boardName as string} submitCallback={submitNameChange} className="w-[fit-content]" buttonClassName="text-xl text-white" />
      <div className="flex">
        {columns.length > 0 ?
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {columns.map((column, index) =>
              <DroppableList key={index} id={column.id} name={column.name} position={column.position} items={column.items} />
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
export type { BackendBoardColumns, CardContent };
