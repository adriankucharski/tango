import React, { ReactNode, useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Toast } from 'react-bootstrap';
import AddListForm from '../AddListForm';

import { BackendBoardColumns } from '../Board'


type ToastMsg = {
  variant: string;
  message: string;
}

const DroppableList = ({ id, name, items }: BackendBoardColumns) => {
  const [listName, setListName] = useState(name);
  const [clicked, setClicked] = useState(false);
  const [toastNode, setToastNode] = useState<ToastMsg | null>(null);
  const [submited, setSubmited] = useState(false);

  const submitNameChange = () => {
    console.log(listName)
    setClicked(false);
  }

  const submitFormCallback = (name: string): Promise<string> => {
    if (submited)
      throw "Another form is submiting";
    setSubmited(true);
    return new Promise((resolve, reject) => {
      setToastNode({
        variant: 'info',
        message: `loading`
      });
      setTimeout(() => {
        if (Math.random() <= 0.1) {
          setToastNode({
            variant: 'danger',
            message: `error`
          });
          setSubmited(false);
          throw "error";
        }
        items.push({
          id: `${name} ${(Math.random())}`,
          content: name,
        })
        resolve("done");
        setToastNode({
          variant: 'success',
          message: `Item added`
        });
        setSubmited(false);
      }, 1000);
    });
  };

  return (
    <div className="w-[272px] bg-[#ebecf0] m-2 h-[fit-content]">
      <div className="w-[100%] p-2">
        {!clicked ?
          <button className="w-[100%] font-bold" onClick={() => setClicked(true)}>
            {listName}
          </button>
          :
          <input className="w-[100%]"
            onChange={e => setListName(e.target.value)}
            onSubmit={submitNameChange}
            onBlur={submitNameChange}
            onKeyDown={e => e.key === 'Enter' && submitNameChange()}
            type="text"
            autoFocus
            value={listName}
          />
        }
      </div>

      <Droppable droppableId={id} key={`${id}${name}`}>
        {provided =>
          <div
            className="w-[272px] min-h-[30px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) =>
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) =>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded-sm m-2 p-3"
                  >
                    {item.content}
                  </div>
                }
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        }
      </Droppable>

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
