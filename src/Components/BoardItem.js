import React from 'react';
import styled from 'styled-components';

const StyledBoardItem = styled.div`
  background: maroon;
  color: white;
  height: 40px;
  width: 100%;
  text-align: center;
`;

export default function BoardItem(props) {
  return <StyledBoardItem>{props.text}</StyledBoardItem>;
}
