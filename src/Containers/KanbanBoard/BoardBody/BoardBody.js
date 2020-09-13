import React from 'react';
import BoardColumn from '../../../Components/BoardColumn';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function BoardBody(props) {
  return (
    <StyledBoardBody>
      {Object.entries(props.columns).map(([id, column]) => {
        return (
          <div key={column.id}>
            <BoardColumn
              removeColumn={props.removeColumn}
              column={column}
              id={id}
            ></BoardColumn>
          </div>
        );
      })}
    </StyledBoardBody>
  );
}
