import React from 'react';
import BoardItem from '../Components/BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
  }
`;

const StyledColumn = styled.div`
  padding: 4px;
  width: 250px;
  min-height: 500px;
  margin-right: 10px;
  background-color: ${(props) =>
    props.snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'};
`;
export default function BoardColumn(props) {
  return (
    <Droppable droppableId={`${props.id}`} key={props.id}>
      {(provided, snapshot) => {
        return (
          <div>
            <StyledColumnHeader>
              <h2>{props.column.name}</h2>
              <button onClick={() => props.removeColumn(props.column.id)}>
                X
              </button>
            </StyledColumnHeader>
            <StyledColumn
              snapshot={snapshot}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {props.column.items.map((item, index) => {
                return (
                  <div key={item.id}>
                    <BoardItem id={item.id} index={index} text={item.text} />
                  </div>
                );
              })}
            </StyledColumn>
          </div>
        );
      }}
    </Droppable>
  );
}
