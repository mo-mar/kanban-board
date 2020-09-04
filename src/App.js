import React from 'react';
import styled from 'styled-components';
import KanbanBoard from './Containers/KanbanBoard/KanbanBoard';

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <StyledApp>
      <h1>Kanban board</h1>
      <KanbanBoard />
    </StyledApp>
  );
}

export default App;
