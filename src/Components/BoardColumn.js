import React from 'react';
import styled from 'styled-components';

const StyledBoardColumn = styled.div`
  height: 600px;
  width: 200px;
  background: mediumseagreen;
  margin-right: 20px;
`;
export default function BoardColumn(props) {
  return <StyledBoardColumn>{props.children}</StyledBoardColumn>;
}
