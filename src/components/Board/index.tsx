import { useCallback, useEffect, useState } from 'react';
import AddListForm from '../AddListForm';
import DroppableList from '../DroppableList';
import Loader from "react-loader-spinner";
import { DragDropContext } from 'react-beautiful-dnd';
import axios, { AxiosError } from 'axios';
import { API_URL } from "../../hooks/useGlobalContext";
import { Toast } from 'react-bootstrap';
import TextInput from '../TextInput';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Share } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

type BoardProps = {

};
type CardContent = {
  id: number;
  name: string;
  listId: string;
  position: string;
  description: string;
  state: string;
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
  const [isLoading, setIsLoading] = useState(true);

  const loadColumns = useCallback(() => {
    columns.forEach(async column => {
      await axios.get(`${API_URL}/board/${boardID}/list/${column.id}/card`)
        .then(r => {
          column.items = r.data;
          column.items?.sort((a, b) => parseInt(a.position) - parseInt(b.position));
          console.log(column);
        })
        .catch((e: AxiosError) => {
          if (e.response?.status !== 500) {
            setToastNode({
              variant: 'danger',
              message: `${e}`
            });
          }
        });
    });
  }, [columns]);


  useEffect(() => {
    (!boardID && !boardName) && navigate('/tango');
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/board/${boardID}/list`)
      .then(r => {
        const { data } = r;
        setColumns(data);
        setIsLoading(false);
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
      });
  }, []);

  useEffect(() => {
    loadColumns();
  }, [isLoading]);

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


  const backendUpdateColumn = (column: BackendBoardColumns) => {
    if (!column.items)
      return;
    column.items.forEach((el, idx) => el.position = `${idx + 1}`);
    column.items.sort((a, b) => parseInt(a.position) - parseInt(b.position));

    column.items.forEach(async el => {
      await axios.put(`${API_URL}/board/${boardID}/list/${el.listId}/card/${el.id}`, el)
        .catch(e => console.log(e));
    });
  };

  const onDragEnd = useCallback(async (result) => {
    if (!result.destination)
      return;

    const { source, destination } = result;
    const newColumns = [...columns];

    if (source.droppableId === destination.droppableId) {
      const column = newColumns.find((e: BackendBoardColumns) => `${e.id}` === source.droppableId);
      if (column && column.items) {
        const [removed] = column.items.splice(source.index, 1);
        column.items.splice(destination.index, 0, removed);
        backendUpdateColumn(column);
      }
    }
    else {
      const sourceColumn = newColumns.find((e: BackendBoardColumns) => `${e.id}` === source.droppableId);
      const destColumn = newColumns.find((e: BackendBoardColumns) => `${e.id}` === destination.droppableId);
      const sourceItems = sourceColumn?.items;
      const destItems = destColumn?.items;

      if (sourceItems && destItems) {
        const [removed] = sourceItems.splice(source.index, 1);
        removed.listId = `${destColumn?.id}`;
        destItems.splice(destination.index, 0, removed);

        backendUpdateColumn(destColumn);
        backendUpdateColumn(sourceColumn);
      }
    }
    setColumns(newColumns);
  }, [isLoading]);

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

  const shareBoardClick = () => {
    console.log(1);
  };

  return (
    <div>
      <div className='flex flex-row items-center'>
        <TextInput name={boardName as string} submitCallback={submitNameChange} className="w-[fit-content]" buttonClassName="text-xl text-white" />
        <Button variant="link" onClick={shareBoardClick}>
          <Share color='white' width={25} height={25} />
        </Button>
      </div>
      <div className="flex">
        {isLoading ?
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          /> :
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {columns.map((column, index) =>
              <DroppableList key={index} id={column.id} name={column.name} position={column.position} items={column.items} />
            )}
          </DragDropContext>
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
