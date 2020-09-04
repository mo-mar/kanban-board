import React from 'react';
import BoardHeader from './BoardHeader/BoardHeader';
import BoardBody from './BoardBody/BoardBody';

export default function KanbanBoard() {
  return (
    <div>
      <BoardHeader />
      <BoardBody />
    </div>
  );
}
