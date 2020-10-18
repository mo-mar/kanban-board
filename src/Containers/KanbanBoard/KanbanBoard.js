import React, { useState, useEffect } from 'react';
import BoardBody from './BoardBody/BoardBody';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const StyledAddColumnButton = styled.button`
  padding: 8px 14px;
  color: white;
  background: #50a0a0b0;
  border-radius: 3px 3px 3px;
  font-weight: 700;
  border: 1px solid black;
  font-size: 16px;
  box-shadow: 0 3px #999;
  &:hover {
    color: teal;
    background: white;
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0 2px #999;
  }
`;

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
  const [columns, setColumns] = useState(
    JSON.parse(window.localStorage.getItem('columns'))
  );
  const [error, setError] = useState('');

  useEffect(() => {
    window.localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    if (columns && Object.keys(columns).length === 5) {
      setError('Max 5 columns');
      return;
    } else {
      setColumns({
        ...columns,
        [uuidv4()]: {
          title: 'New column',
          items: [],
        },
      });
    }
  };

  const removeColumn = (columnId) => {
    if (!columns) {
      return;
    }
    if (columns && !Object.keys(columns).length) {
      setError('No columns left');
      return;
    } else {
      setError('');
      let newColumns = { ...columns };
      delete newColumns[columnId];
      setColumns({ ...newColumns });
    }
  };

  const updateColumnTitle = (columnId, newTitle) => {
    let newColumns = { ...columns };
    let columnToUpdate = newColumns[columnId];
    if (columnToUpdate.title !== newTitle) {
      columnToUpdate.title = newTitle;
      setColumns({ ...newColumns });
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

  const removeItem = (columnId, itemId) => {
    let columnToUpdate = columns[columnId];
    let newItems = columnToUpdate.items.filter((item) => {
      return item.id !== itemId;
    });
    columnToUpdate.items = newItems;
    setColumns({ ...columns });
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <StyledAddColumnButton onClick={addColumn}>
        ADD COLUMN
      </StyledAddColumnButton>
      <BoardBody
        columns={columns}
        removeColumn={removeColumn}
        addItem={addItem}
        updateColumnTitle={updateColumnTitle}
        removeItem={removeItem}
      />

      {error ? error : null}
    </DragDropContext>
  );
}
