import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import AddListForm from '../AddListForm';
import DroppableList from '../DroppableList';
import Loader from "react-loader-spinner";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type BoardProps = {

};

type BackendBoardColumns = {
  name: string;
  items: {
    id: string;
    content: string;
  }[];
};

const Board = ({ }: BoardProps) => {
  const [columns, setColumns] = useState<BackendBoardColumns[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const arr: BackendBoardColumns[] = [];
      for (let i = 0; i < 5; ++i)
        arr.push({
          name: `Column_${i}`, items: [
            { id: `${i * 10}`, content: `Content ${i * 10 + i}` }
          ]
        });
      setColumns(arr);
    }, 1000);
  }, []);

  const submitFormCallback = (name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (Math.random() <= 0.5)
        throw "error";
      setTimeout(() => resolve("done"), 1);
    });
  };

  const onDragEnd = useCallback((result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    const newColumns = [...columns];
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = newColumns.find((e: BackendBoardColumns) => e.name === source.droppableId);
      const destColumn = newColumns.find((e: BackendBoardColumns) => e.name === destination.droppableId);
      const destItems = destColumn?.items;
      //@ts-ignore
      const [removed] = sourceColumn.items.splice(source.index, 1);
      destItems?.splice(destination.index, 0, removed);
    } else {
      const column = newColumns.find((e: BackendBoardColumns) => e.name === source.droppableId);
      column && ([column.items[source.index], column.items[destination.index]] = [column.items[destination.index], column.items[source.index]]);
    }
    setColumns(newColumns);
  }, [columns]);

  const onDragEnd2 = useCallback((result) => {

  }, []);

  return (
    <div>
      <div className="flex">
        {!columns &&
          <Loader type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        }
        {columns &&
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {columns.map((column, index) =>
              <DroppableList key={index} name={column.name} items={column.items} />
            )}
          </DragDropContext>
        }

        <AddListForm
          openButtonName="+ Add a list"
          addButtonName="Add list"
          closeButtonName="Close"
          placeholder="Enter list title..."
          submitFormCallback={submitFormCallback}
          className="w-[272px] m-2"
          buttonTextColor="text-white"
        />
      </div>
    </div>
  )
};

export default Board;
export type { BackendBoardColumns };