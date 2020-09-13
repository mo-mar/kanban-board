import React, { useState } from 'react';
import BoardColumn from '../../../Components/BoardColumn';
import styled from 'styled-components';
import BoardItem from '../../../Components/BoardItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const columnsFromBackEnd = [
  {
    id: uuidv4(),
    name: 'Todo',
    items: [
      {
        id: uuidv4(),
        text: 'eat',
      },
      {
        id: uuidv4(),
        text: 'study',
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'In Progress',
    items: [
      {
        id: uuidv4(),
        text: 'eat',
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Done',
    items: [
      {
        id: uuidv4(),
        text: 'eat',
      },
    ],
  },
];

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: space-between;
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

export default function BoardBody() {
  const [columns, setColumns] = useState(columnsFromBackEnd);

  return (
    <StyledBoardBody>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div key={column.id}>
              <h2>{column.name}</h2>
              <BoardColumn>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? 'lightblue'
                            : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                          marginRight: '10px',
                        }}
                      >
                        {provided.placeholder}
                        {column.items.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <Draggable
                                key={item.id}
                                draggableId={`${item.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? 'red'
                                          : 'green',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <BoardItem text={item.text}></BoardItem>
                                    </div>
                                  );
                                }}
                              </Draggable>
                              {provided.placeholder}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                </Droppable>
              </BoardColumn>
            </div>
          );
        })}
      </DragDropContext>
    </StyledBoardBody>
  );
}
