import React from 'react';
import BoardColumn from '../../../Components/BoardColumn';
import styled from 'styled-components';
import BoardItem from '../../../Components/BoardItem';

const StyledBoardBody = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function BoardBody() {
  return (
    <StyledBoardBody>
      <BoardColumn>
        <BoardItem text="hi" />
      </BoardColumn>
      <BoardColumn></BoardColumn>
      <BoardColumn></BoardColumn>
    </StyledBoardBody>
  );
}
