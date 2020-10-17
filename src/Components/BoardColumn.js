import React, { useState, Fragment } from 'react';
import BoardItem from '../Components/BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr 40px auto;
`;

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

const StyledTitleForm = styled.form`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

const StyledAddItemButton = styled.button`
  border: none;
  background: none;
  display: block;
  margin: 8px auto;
  font-size: 16px;
  &:hover {
    color: teal;
    cursor: pointer;
  }
`;

const StyledColumnTitle = styled.h2`
  font-weight: 700;
  font-size: 20px;
`;

const StyledTitleErrorField = styled.div`
  width: 100%;
  color: red;
  margin-top: 8px;
  text-align: center;
`;

export default function BoardColumn(props) {
  const [columnTitle, setColumnTitle] = useState(props.column.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [itemTextError, setItemTextError] = useState('');
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
    if (!itemText) {
      setItemTextError('Tasks cannot be blank.');
      return;
    }
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
                  <div>
                    <input
                      type="text"
                      value={columnTitle}
                      onChange={(event) => setColumnTitle(event.target.value)}
                    />
                    <button type="button" onClick={() => cancelEditingTitle()}>
                      Cancel
                    </button>
                    <button type="submit">Save</button>
                  </div>
                  {titleError ? (
                    <StyledTitleErrorField>{titleError}</StyledTitleErrorField>
                  ) : null}
                </StyledTitleForm>
              </Fragment>
            ) : (
              <StyledColumnHeader>
                <StyledColumnTitle>{columnTitle}</StyledColumnTitle>
                <i
                  onClick={() => toggleIsEditingColumnTitle()}
                  className="fas fa-edit"
                ></i>
                <i
                  onClick={() => props.removeColumn(props.id)}
                  className="fas fa-trash"
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
            {itemTextError ? (
              <StyledTitleErrorField>{itemTextError}</StyledTitleErrorField>
            ) : null}
          </StyledContainer>
        );
      }}
    </Droppable>
  );
}
