import React from 'react';
import styled from 'styled-components';

const StyledAddItemForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 6px 0;
  height: 40px;
`;

export default function AddItemForm(props) {
  return (
    <StyledAddItemForm>
      <input
        type="text"
        onChange={(event) => props.setItemText(event.target.value)}
      />
      <button type="button" onClick={() => props.toggleIsAddingItemText()}>
        Cancel
      </button>
      <button type="submit" onClick={(event) => props.saveItemText(event)}>
        Save
      </button>
    </StyledAddItemForm>
  );
}
