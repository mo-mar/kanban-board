import React from 'react';
import BoardColumn from '../../../Components/BoardColumn';
import styled from 'styled-components';
import BoardItem from '../../../Components/BoardItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
};
export default function BoardBody() {
  return (
    <StyledBoardBody>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Droppable droppableId={'1'} key={1}>
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
                }}
              >
                <Draggable key={1} draggableId={'1'} index={0}>
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
                        "test"
                      </div>
                    );
                  }}
                </Draggable>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        {/* <Droppable droppableId={2}>
          <BoardColumn></BoardColumn>
        </Droppable> */}
      </DragDropContext>
    </StyledBoardBody>
  );
}
