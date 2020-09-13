import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function BoardItem(props) {
  return (
    <div>
      <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                backgroundColor: snapshot.isDragging ? 'red' : 'green',
                padding: 16,
                margin: '0 0 8px 0',
                minHeight: '50px',
                color: 'white',
                ...provided.draggableProps.style,
              }}
            >
              {provided.placeholder}
              {props.text}
            </div>
          );
        }}
      </Draggable>
    </div>
  );
}
