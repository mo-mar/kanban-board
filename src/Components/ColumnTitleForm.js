import React from 'react';
import styled from 'styled-components';

const StyledTitleForm = styled.form`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledTitleErrorField = styled.div`
  width: 100%;
  color: red;
  margin-top: 8px;
  text-align: center;
`;

export default function ColumnTitleForm(props) {
  return (
    <StyledTitleForm onSubmit={(event) => props.saveTitle(event)}>
      <div>
        <input
          type="text"
          value={props.columnTitle}
          onChange={(event) => props.setColumnTitle(event.target.value)}
        />
        <button type="button" onClick={() => props.cancelEditingTitle()}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
      {props.titleError ? (
        <StyledTitleErrorField>{props.titleError}</StyledTitleErrorField>
      ) : null}
    </StyledTitleForm>
  );
}
