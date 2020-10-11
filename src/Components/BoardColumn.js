import React, { useState, Fragment } from 'react';
import BoardItem from '../Components/BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr 40px auto;
`;

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  i {
    font-size: 20px;
  }
  i:hover {
    color: teal;
  }
`;

const StyledTitleForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 87px;
`;

const StyledItemTextForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 6px 0;
  height: 40px;
`;

const StyledColumnBody = styled.div`
  padding: 12px 16px;
  width: 250px;
  height: 500px;
  overflow-y: auto;
  border: 4px solid lightblue;
  border-radius: 5px 5px;
  margin-right: 10px;
  margin-top: 20px;
  background-color: ${(props) =>
    props.snapshot.isDraggingOver ? 'lightblue' : 'white'};
`;

const StyledRemoveColumnButton = styled.button`
  display: inline-block;
  margin: 10px auto;
`;

const StyledAddItemButton = styled.button`
  display: block;
  margin: 8px auto;
`;

const StyledColumnTitle = styled.h2`
  font-weight: 700;
`;

const StyledTitleErrorField = styled.div`
  width: 100%;
  color: red;
  margin-top: -25px;
  text-align: center;
`;

export default function BoardColumn(props) {
  const [columnTitle, setColumnTitle] = useState(props.column.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [isAddingItemText, setIsAddingItemText] = useState(false);
  const [itemText, setItemText] = useState('');

  const toggleIsEditingColumnTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const toggleIsAddingItemText = () => {
    setIsAddingItemText(!isAddingItemText);
  };

  const cancelEditingTitle = () => {
    toggleIsEditingColumnTitle();
    setColumnTitle(props.column.title);
  };

  const saveTitle = (event) => {
    event.preventDefault();
    if (!columnTitle) {
      setTitleError('Please enter a valid column title.');
      return;
    }
    props.updateColumnTitle(props.id, columnTitle);
    setIsEditingTitle(!isEditingTitle);
  };

  const saveItemText = (event) => {
    event.preventDefault();
    props.addItem(props.id, itemText);
    toggleIsAddingItemText();
  };

  return (
    <Droppable droppableId={`${props.id}`} key={props.id}>
      {(provided, snapshot) => {
        return (
          <StyledContainer>
            {isEditingTitle ? (
              <Fragment>
                <StyledTitleForm onSubmit={(event) => saveTitle(event)}>
                  <input
                    type="text"
                    value={columnTitle}
                    onChange={(event) => setColumnTitle(event.target.value)}
                  />
                  <button type="button" onClick={() => cancelEditingTitle()}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </StyledTitleForm>
                {titleError ? (
                  <StyledTitleErrorField>{titleError}</StyledTitleErrorField>
                ) : null}
              </Fragment>
            ) : (
              <StyledColumnHeader>
                <StyledColumnTitle>{columnTitle}</StyledColumnTitle>
                <i
                  onClick={() => toggleIsEditingColumnTitle()}
                  className="fas fa-edit"
                ></i>
              </StyledColumnHeader>
            )}
            <StyledColumnBody
              snapshot={snapshot}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {props.column.items.map((item, index) => {
                return (
                  <div key={item.id}>
                    <BoardItem
                      id={item.id}
                      index={index}
                      text={item.text}
                      columnId={props.id}
                      removeItem={props.removeItem}
                    />
                  </div>
                );
              })}
            </StyledColumnBody>

            {isAddingItemText ? (
              <StyledItemTextForm>
                <input
                  type="text"
                  onChange={(event) => setItemText(event.target.value)}
                />
                <button type="button" onClick={() => toggleIsAddingItemText()}>
                  Cancel
                </button>
                <button type="submit" onClick={(event) => saveItemText(event)}>
                  Save
                </button>
              </StyledItemTextForm>
            ) : (
              <StyledAddItemButton onClick={() => toggleIsAddingItemText()}>
                <i className="fas fa-plus"></i>
              </StyledAddItemButton>
            )}
            <StyledRemoveColumnButton
              onClick={() => props.removeColumn(props.id)}
            >
              Delete column
            </StyledRemoveColumnButton>
          </StyledContainer>
        );
      }}
    </Droppable>
  );
}
