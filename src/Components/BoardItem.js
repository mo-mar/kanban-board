import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledBoardItem = styled.div`
  background-color: ${(props) =>
    props.snapshot.isDragging ? 'white' : '#d7f9f963'};
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
  position: relative;
`;

const StyledTrashButton = styled.i`
  position: absolute;
  font-size: 16px;
  top: 4px;
  right: 5px;
  cursor: default;
  &:hover {
    color: teal;
  }
`;

export default function BoardItem(props) {
  return (
    <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
      {(provided, snapshot) => {
        return (
          <Fragment>
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
              <StyledTrashButton
                onClick={() => props.removeItem(props.columnId, props.id)}
                className="fas fa-trash"
              ></StyledTrashButton>
            </StyledBoardItem>
          </Fragment>
        );
      }}
    </Draggable>
  );
}
