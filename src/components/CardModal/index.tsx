import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import TextInput from '../TextInput';
import Button from "react-bootstrap/Button";
import { Bookmark, BodyText, Archive, Trash } from "react-bootstrap-icons";
import { CardContent } from '../Board';
import axios from 'axios';
import { API_URL } from '../../hooks/useGlobalContext';


type CardModalProps = {
  readonly show: boolean;
  readonly cardName: string;
  readonly description: string;
  readonly card: CardContent | null;
  readonly errMsg: string;
  readonly boardID: string | null;

  onCloseModal: () => void;
  submitChangeNameCallback: (newCardName: string) => Promise<void>;
  submitChangeDescriptionCallback: (newCardName: string) => Promise<void>;
  setDescriptionCallback: (e: React.SyntheticEvent) => Promise<void>;
  setDescription: (value: React.SetStateAction<string>) => void;
}

const CardModal = ({
  show,
  description,
  cardName,
  card,
  errMsg,
  boardID,
  onCloseModal,
  submitChangeNameCallback,
  submitChangeDescriptionCallback,
  setDescriptionCallback,
  setDescription,
}: CardModalProps) => {
  let isSubmitting = false;

  const stateRequest = async (body: CardContent) => {
    if (!isSubmitting) {
      isSubmitting = true;
      const url = `${API_URL}/board/${boardID}/list/${body?.listId}/card/${body?.id}`;
      await axios.put(url, body)
        .then(() => { window.location.reload() })
        .catch(e => { });
      isSubmitting = false;
    }
  };

  const deleteCardCallback = async () => {
    if (!card)
      return;
    const body = { ...card };
    body.state = "DELETE";
    await stateRequest(body);
  };

  const archiveCardCallback = async () => {
    if (!card)
      return;
    const body = { ...card };
    body.state = "ARCHIVE";
    await stateRequest(body);
  };

  return (
    <Modal show={show} onHide={onCloseModal} size="lg" contentClassName='!bg-[#e4ebf7]'>
      <Modal.Header closeButton>
        <Modal.Title className='flex flex-row w-[100%] items-center'>
          <Bookmark width={24} height={24} />
          <TextInput name={cardName} submitCallback={submitChangeNameCallback} buttonClassName="text-left" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex gap-3">
        <div className="w-[80%]">
          <div className='flex flex-row w-[100%] items-center text-xl'>
            <BodyText width={24} height={24} />
            <span className='p-2'>Description</span>
          </div>
          {card?.description ?
            <div className='ml-6'>
              <TextInput name={description} submitCallback={submitChangeDescriptionCallback} buttonClassName="text-left" inputType='textarea' />
            </div>
            :
            <Form onSubmit={setDescriptionCallback}>
              <Form.Control
                className='mb-3'
                value={description}
                as="textarea" placeholder="Add card description"
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          }
        </div>
        <div className="w-[20%] flex flex-col gap-2">
          <span className="font-bold">Actions</span>
          <Button variant="secondary" className="w-[100%]" onClick={archiveCardCallback}>
            <div className='flex items-center'>
              <Archive />
              <span className='ml-2'>Archive</span>
            </div>
          </Button>
          <Button variant="danger" className="w-[100%]" onClick={deleteCardCallback}>
            <div className='flex items-center'>
              <Trash />
              <span className='ml-2'>Delete</span>
            </div>
          </Button>
        </div>
        {errMsg && <p className="text-red-500 pt-2 m-0">{errMsg}</p>}
      </Modal.Body>
    </Modal>
  )
};

export default CardModal;
