import React from 'react';
import BoardColumn from '../../../Components/BoardColumn';
import styled from 'styled-components';

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 16px 32px;
  max-width: 1550px;
  @media (max-width: 800px) {
    justify-content: flex-start;
    overflow-x: auto;
  }
`;

export default function BoardBody(props) {
  return (
    <StyledBoardBody>
      {props.columns
        ? Object.entries(props.columns).map(([id, column]) => {
            return (
              <div key={id}>
                <BoardColumn
                  updateColumnTitle={props.updateColumnTitle}
                  removeColumn={props.removeColumn}
                  addItem={props.addItem}
                  removeItem={props.removeItem}
                  column={column}
                  id={id}
                ></BoardColumn>
              </div>
            );
          })
        : null}
    </StyledBoardBody>
  );
}
