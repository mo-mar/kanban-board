import React from 'react';
import BoardHeaderItem from '../../../Components/BoardHeaderItem';
import styled from 'styled-components';

const StyledBoardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BoardHeader() {
  return (
    <StyledBoardHeader>
      <BoardHeaderItem title="To Do"></BoardHeaderItem>
      <BoardHeaderItem title="Doing"></BoardHeaderItem>
      <BoardHeaderItem title="Done"></BoardHeaderItem>
    </StyledBoardHeader>
  );
}
