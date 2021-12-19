import React, { ReactNode, useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

type AddListButtonProps = {
  openButtonName: string;
  addButtonName: string;
  closeButtonName: string;
  placeholder: string;
  submitFormCallback: (name: string) => Promise<string>;
  className?: string;
  buttonTextColor?: string;
};

const AddListForm = ({ openButtonName, addButtonName, closeButtonName, placeholder, submitFormCallback, className, buttonTextColor }: AddListButtonProps) => {
  const [name, setName] = useState('');
  const [clicked, setClicked] = useState(false);

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await submitFormCallback(name)
      .then(() => {
        setName('');
        setClicked(false);
      })
      .catch(() => { });
  };

  const setClickedCallback = (state: boolean) => {
    setClicked(state);
  };

  return (
    <Form onSubmit={submitForm} className={className}>
      {!clicked ?
        (
          <button
            className={`!bg-[#ffffff3a] hover:!bg-[#0000009a] btn w-[100%]  ${buttonTextColor}`}
            onClick={() => setClickedCallback(true)}
          >
            {openButtonName}
          </button>
        )
        :
        (
          <div className="bg-[#ebecf0] p-1">
            <Form.Group controlId="name" className="m-2">
              <Form.Control
                autoFocus
                type="name"
                value={name}
                placeholder={placeholder}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Button className="m-2" size="sm" type="submit" disabled={name.length === 0}>
              {addButtonName}
            </Button>
            <Button className="m-2" size="sm" variant="danger" onClick={() => setClickedCallback(false)}>
              {closeButtonName}
            </Button>
          </div>
        )
      }
    </Form >
  )
};

export default AddListForm;
