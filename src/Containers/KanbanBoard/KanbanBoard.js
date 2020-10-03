import React, { useState } from 'react';
import BoardBody from './BoardBody/BoardBody';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const columnsFromBackEnd = [
  // {
  //   id: uuidv4(),
  //   name: 'Todo',
  //   items: [],
  // },
  // {
  //   // id: uuidv4(),
  //   // name: 'In Progress',
  //   // items: [],
  // },
  // {
  //   // id: uuidv4(),
  //   // name: 'Done',
  //   // items: [],
  // },
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(columnsFromBackEnd);
  const [error, setError] = useState('');

  const addColumn = () => {
    if (Object.keys(columns).length === 5) {
      setError('Max 5 columns');
      return;
    } else {
      setColumns({
        ...columns,
        [uuidv4()]: {
          name: 'New column',
          items: [],
        },
      });
    }
  };

  const removeColumn = (columnId) => {
    debugger;
    if (!Object.keys(columns).length) {
      setError('No columns left');
      return;
    } else {
      setError('');
      delete columns[columnId];
      setColumns({ ...columns });
    }
  };

  const updateColumnTitle = (columnId, newTitle) => {
    let columnToUpdate = columns[columnId];
    if (columnToUpdate.title !== newTitle) {
      columnToUpdate.title = newTitle;
      setColumns({ ...columns });
    } else {
      return;
    }
  };

  const addItem = (columnId, itemText) => {
    let columnToUpdate = columns[columnId];
    let newItem = {
      id: uuidv4(),
      text: itemText,
    };
    columnToUpdate.items.push(newItem);
    setColumns({ ...columns });
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <BoardBody
        columns={columns}
        removeColumn={removeColumn}
        addItem={addItem}
        updateColumnTitle={updateColumnTitle}
      />
      <button onClick={addColumn}>ADD COLUMN</button>
      {error ? error : null}
    </DragDropContext>
  );
}
