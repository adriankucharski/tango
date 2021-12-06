import axios from 'axios';
import React, { ReactNode, useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Form, Modal, Toast } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../hooks/useGlobalContext';
import AddListForm from '../AddListForm';

import { BackendBoardColumns, CardContent } from '../Board'
import TextInput from '../TextInput';
import Button from "react-bootstrap/Button";

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
      .then(r => {
        console.log(r.data)
      })
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
    return new Promise((resolve, reject) => {
      setToastNode({
        variant: 'info',
        message: `loading`
      });
      return axios.post(`${API_URL}/board/${boardID}/list/${id}/card`, { name: name, description: '' })
        .then(r => {
          items ? items.push(r.data) : items = r.data;
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
      position: `${selectedCard?.position}`,
      name: cardName,
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

  const submitChangeNameCallback = useCallback(async (newCardName: string) => {
    const body = {
      description: description,
      listId: selectedCard?.listId,
      position: `${selectedCard?.position}`,
      name: newCardName,
    }
    console.log(body, selectedCard);
    await axios.put(`${API_URL}/board/${boardID}/list/${id}/card/${selectedCard?.id}`, body)
      .then(() => {
        if (selectedCard)
          selectedCard.name = newCardName;
        setCardName(newCardName);
      })
      .catch(e => {
        setToastNode({
          variant: 'danger',
          message: `Cannot set description`
        });
        console.log(e);
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
                {(provided, snapshot) =>
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

      <Modal show={show} onHide={onCloseModal} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title><TextInput name={cardName} submitCallback={submitChangeNameCallback} /> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={setDescriptionCallback}>
            <Form.Group className="mb-3">
              <Form.Control
                value={description}
                as="textarea" placeholder="Add card description"
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
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
