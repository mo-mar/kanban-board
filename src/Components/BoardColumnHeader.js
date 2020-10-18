import React from 'react';
import styled from 'styled-components';

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  i {
    font-size: 18px;
    cursor: pointer;
  }
  i:hover {
    color: teal;
  }
`;

const StyledColumnTitle = styled.h2`
  font-weight: 700;
  font-size: 20px;
`;

export default function BoardColumnHeader(props) {
  return (
    <StyledColumnHeader>
      <StyledColumnTitle>{props.columnTitle}</StyledColumnTitle>
      <i
        onClick={() => props.toggleIsEditingColumnTitle()}
        className="fas fa-edit"
      ></i>
      <i
        onClick={() => props.removeColumn(props.id)}
        className="fas fa-trash"
      ></i>
    </StyledColumnHeader>
  );
}
