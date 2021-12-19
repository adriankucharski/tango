import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import TextInput from '../TextInput';
import Button from "react-bootstrap/Button";
import { Bookmark, BodyText } from "react-bootstrap-icons";
import { CardContent } from '../Board';


type CardModalProps = {
  readonly show: boolean;
  readonly cardName: string;
  readonly description: string;
  readonly card: CardContent | null;
  readonly errMsg: string;

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
  onCloseModal,
  submitChangeNameCallback,
  submitChangeDescriptionCallback,
  setDescriptionCallback,
  setDescription,
}: CardModalProps) => {

  return (
    <Modal show={show} onHide={onCloseModal} size="lg" >
      <Modal.Header closeButton>
        <Modal.Title className='flex flex-row w-[100%] items-center'>
          <Bookmark width={24} height={24} />
          <TextInput name={cardName} submitCallback={submitChangeNameCallback} buttonClassName="text-left" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        {errMsg && <p className="text-red-500 pt-2 m-0">{errMsg}</p>}
      </Modal.Body>
    </Modal>
  )
};

export default CardModal;
