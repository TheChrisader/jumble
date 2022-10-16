import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const BoardWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 300px;
  padding: 30px;
  gap: 20px;
  min-height: 100%;
`;

const status = {
  0: {
    name: "Requested",
    items: [
      { id: "0er", content: "First task" },
      { id: "1er", content: "Second task" },
      { id: "2er", content: "Third task" },
      { id: "3er", content: "Fourth task" },
    ],
  },
  1: {
    name: "To do",
    items: [],
  },
  2: {
    name: "In Progress",
    items: [],
  },
  3: {
    name: "Done",
    items: [],
  },
};

const Board = () => {
  const [columns, setColumns] = useState(status);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <BoardWrapper>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Column
              droppableId={columnId}
              key={columnId}
              index={index}
              column={column}
            />
          );
        })}
      </DragDropContext>
    </BoardWrapper>
  );
};

export default Board;
