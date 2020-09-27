import React, { useState, Fragment } from 'react';
import BoardItem from '../Components/BoardItem';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 87px;
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
`;

const StyledColumnBody = styled.div`
  padding: 12px 16px;
  width: 250px;
  height: 500px;
  overflow-y: auto;
  border: 2px solid lightblue;
  border-radius: 5px 5px;
  margin-right: 10px;
  background-color: ${(props) =>
    props.snapshot.isDraggingOver ? 'lightblue' : 'white'};
`;

const StyledRemoveColumnButton = styled.button`
  display: block;
  margin-left: auto;
  margin-bottom: 20px;
`;

const StyledAddItemButton = styled.button`
  display: block;
  margin: 8px auto;
  margin-bottom: 20px;
`;

const StyledColumnTitle = styled.h2``;

export default function BoardColumn(props) {
  const [columnTitle, setColumnTitle] = useState(props.column.name);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAddingItemText, setIsAddingItemText] = useState(false);
  const [itemText, setItemText] = useState('');

  const toggleIsEditingColumnTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const toggleIsAddingItemText = () => {
    setIsAddingItemText(!isAddingItemText);
  };

  const saveTitle = (event) => {
    event.preventDefault();
    props.updateColumnTitle(props.column.id, columnTitle);
    setIsEditingTitle(!isEditingTitle);
  };

  const saveItemText = (event) => {
    event.preventDefault();
    props.addItem(props.column.id, itemText);
    toggleIsAddingItemText();
  };

  return (
    <Droppable droppableId={`${props.id}`} key={props.id}>
      {(provided, snapshot) => {
        return (
          <Fragment>
            <StyledContainer>
              <div>
                {isEditingTitle ? (
                  <StyledTitleForm onSubmit={(event) => saveTitle(event)}>
                    <input
                      type="text"
                      value={columnTitle}
                      onChange={(event) => setColumnTitle(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => toggleIsEditingColumnTitle()}
                    >
                      Cancel
                    </button>
                    <button type="submit">Save</button>
                  </StyledTitleForm>
                ) : (
                  <StyledColumnHeader>
                    <StyledColumnTitle>{columnTitle}</StyledColumnTitle>
                    <button onClick={() => toggleIsEditingColumnTitle()}>
                      Edit title
                    </button>
                  </StyledColumnHeader>
                )}
              </div>
              <StyledColumnBody
                snapshot={snapshot}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <StyledRemoveColumnButton
                  onClick={() => props.removeColumn(props.column.id)}
                >
                  X
                </StyledRemoveColumnButton>

                {provided.placeholder}
                {props.column.items.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <BoardItem id={item.id} index={index} text={item.text} />
                    </div>
                  );
                })}
              </StyledColumnBody>

              {isAddingItemText ? (
                <StyledItemTextForm>
                  <input
                    type="text"
                    value={itemText}
                    onChange={(event) => setItemText(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => toggleIsAddingItemText()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(event) => saveItemText(event)}
                  >
                    Save
                  </button>
                </StyledItemTextForm>
              ) : (
                <StyledAddItemButton onClick={() => toggleIsAddingItemText()}>
                  Add Item
                </StyledAddItemButton>
              )}
            </StyledContainer>
          </Fragment>
        );
      }}
    </Droppable>
  );
}
