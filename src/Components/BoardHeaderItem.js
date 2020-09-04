import React from 'react';
import styled from 'styled-components';

const StyledBoardHeaderItem = styled.div`
  background: maroon;
  flex: 1 0 100%;
  color: white;
  margin-right: 8px;
  text-align: center;
`;

export default function BoardHeaderItem(props) {
  return <StyledBoardHeaderItem>{props.title}</StyledBoardHeaderItem>;
}
