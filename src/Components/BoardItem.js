import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledBoardItem = styled.div`
  background-color: ${(props) =>
    props.snapshot.isDragging ? 'white' : '#D0C4DF'};
  padding: 1px;
  border: 1px solid black;
  border-radius: 4px 4px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

export default function BoardItem(props) {
  return (
    <div>
      <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
        {(provided, snapshot) => {
          return (
            <StyledBoardItem
              snapshot={snapshot}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
              }}
            >
              {provided.placeholder}
              {props.text}
            </StyledBoardItem>
          );
        }}
      </Draggable>
    </div>
  );
}
