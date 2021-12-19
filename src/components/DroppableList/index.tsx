import axios, { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Toast } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../hooks/useGlobalContext';
import AddListForm from '../AddListForm';
import { BackendBoardColumns, CardContent } from '../Board'
import TextInput from '../TextInput';
import CardModal from '../CardModal';

type ToastMsg = {
  variant: string;
  message: string;
}

const DroppableList = ({ id, name, items }: BackendBoardColumns) => {
  const [toastNode, setToastNode] = useState<ToastMsg | null>(null);
  const [submited, setSubmited] = useState(false);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [selectedCard, setSelectedCard] = useState<CardContent | null>(null);
  const [description, setDescription] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();
  const [boardID, setBoardID] = useState<string | null>(searchParams.get('id'));

  const submitNameChange = async (newName: string) => {
    await axios.post(`${API_URL}/board/${id}/list`, { name: newName })
      .catch(e => {
        setToastNode({
          variant: 'danger',
          message: `Cannot change the name`
        });
        console.log(e);
      });
  };

  const submitFormCallback = (name: string): Promise<string> => {
    if (submited)
      throw "Another form is submiting";
    setSubmited(true);
    return new Promise((resolve) => {
      setToastNode({
        variant: 'info',
        message: `loading`
      });
      const body = { name: name, description: '' };
      return axios.post(`${API_URL}/board/${boardID}/list/${id}/card`, body)
        .then(r => {
          items ? items.push(r.data) : items = r.data;
          items = items?.sort((a, b) => parseInt(a.position) - parseInt(b.position));
          resolve(name);
        })
        .catch(e => {
          setToastNode({
            variant: 'danger',
            message: `Cannot add item`
          });
        })
        .finally(() => setSubmited(false));
    });
  };

  const onCloseModal = () => {
    setShow(false);
    setCardName('');
  };

  const openCardModal = (item: CardContent) => {
    setSelectedCard(item);
    setDescription(item.description);
    setCardName(item.name);
    setShow(true);
  };

  const setDescriptionCallback = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = {
      id: selectedCard?.id,
      description: description,
      listId: selectedCard?.listId,
      position: selectedCard?.position,
      name: cardName,
      state: selectedCard?.state,
    }
    await axios.put(`${API_URL}/board/${boardID}/list/${id}/card/${selectedCard?.id}`, body)
      .then(() => {
        if (selectedCard)
          selectedCard.description = description as string;
        setShow(false);
      })
      .catch(e => {
        setToastNode({
          variant: 'danger',
          message: `Cannot set description`
        });
        console.log(e);
        setShow(false);
      });
  }, [cardName, description]);

  const submitChangeDescriptionCallback = useCallback(async (newDescription: string) => {
    if (newDescription === selectedCard?.description)
      return;

    const body = {
      name: selectedCard?.name,
      listId: selectedCard?.listId,
      position: selectedCard?.position,
      description: newDescription,
      state: selectedCard?.state,
    }
    await axios.put(`${API_URL}/board/${boardID}/list/${id}/card/${selectedCard?.id}`, body)
      .then(() => {
        if (selectedCard)
          selectedCard.description = newDescription;
        setDescription(newDescription);
      })
      .catch((e: AxiosError) => {
        setToastNode({
          variant: 'danger',
          message: `Cannot set description`
        });
        setShow(false);
      });
  }, [selectedCard]);

  const submitChangeNameCallback = useCallback(async (newCardName: string) => {
    if (newCardName === selectedCard?.name)
      return;

    const body = {
      name: newCardName,
      listId: selectedCard?.listId,
      position: selectedCard?.position,
      description: description,
      state: selectedCard?.state,
    }
    await axios.put(`${API_URL}/board/${boardID}/list/${id}/card/${selectedCard?.id}`, body)
      .then(() => {
        if (selectedCard)
          selectedCard.name = newCardName;
        setCardName(newCardName);
      })
      .catch((e: AxiosError) => {
        setToastNode({
          variant: 'danger',
          message: `Cannot set description`
        });
        setShow(false);
      });
  }, [selectedCard]);

  return (
    <div className="w-[272px] bg-[#ebecf0] m-2 h-[fit-content]">
      <TextInput name={name} submitCallback={submitNameChange} />
      <Droppable droppableId={`${id}`} key={`${id}${name}`}>
        {provided =>
          <div
            className="w-[272px] min-h-[30px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items?.map((item, index) =>
              <Draggable
                key={item.id}
                draggableId={`${item.id}`}
                index={index}
              >
                {(provided) =>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => openCardModal(item)}
                    className="bg-white rounded-sm m-2 p-3"
                  >
                    {item.name}
                  </div>
                }
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        }
      </Droppable>

      <CardModal
        show={show}
        cardName={cardName}
        description={description}
        card={selectedCard}
        errMsg={errMsg}
        onCloseModal={onCloseModal}
        submitChangeNameCallback={submitChangeNameCallback}
        submitChangeDescriptionCallback={submitChangeDescriptionCallback}
        setDescriptionCallback={setDescriptionCallback}
        setDescription={setDescription}
      />

      <AddListForm
        openButtonName="+ Add another card"
        addButtonName="Add card"
        closeButtonName="Close"
        placeholder="Enter card title..."
        submitFormCallback={submitFormCallback}
        className="m-2"
      />

      <Toast className="absolute !w-[272px] my-2" bg={toastNode?.variant} onClose={() => setToastNode(null)} show={Boolean(toastNode)} delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Status</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{toastNode?.message}</Toast.Body>
      </Toast>
    </div >
  )
};

export default DroppableList;
