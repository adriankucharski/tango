import React, { ReactNode, useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddListForm from '../AddListForm';

import { BackendBoardColumns } from '../Board'


const DroppableList = ({ name, items }: BackendBoardColumns) => {
  const [listName, setListName] = useState(name);
  const [clicked, setClicked] = useState(false);

  const submitNameChange = () => {
    console.log(listName)
    setClicked(false);
  }

  const submitFormCallback = (name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (Math.random() <= 0.5)
        throw "error";
      setTimeout(() => resolve("done"), 1);
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

      <Droppable droppableId={name} key={name}>
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
    </div >
  )
};

export default DroppableList;
