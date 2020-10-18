import React from 'react';
import styled from 'styled-components';
import KanbanBoard from './Containers/KanbanBoard/KanbanBoard';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
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
