import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { IBoard, IColumn } from "../utils/types/DataTypes";

interface IBoardComponent {
  board: IBoard;
}

const BoardWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 300px;
  padding: 30px;
  gap: 20px;
  min-height: 100%;
`;

const Board: React.FC<IBoardComponent> = ({ board }) => {
  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    setColumns(board?.columns);
  }, []);

  const onDragEnd = (
    result: DropResult,
    columns: IColumn[],
    setColumns: any
  ) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const columnObject = columns.reduce((acc: any, value: any) => {
      return { ...acc, [value.id]: value };
    }, {});

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column: IColumn) => column.id === source.droppableId
      );
      const sourceTasks = [...sourceColumn!.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      const newSourceColumn = { ...sourceColumn, tasks: sourceTasks };

      const destColumn = columns.find(
        (column: IColumn) => column.id === destination.droppableId
      );
      const destTasks = [...destColumn!.tasks];
      destTasks.splice(destination.index, 0, removed);
      const newDestColumn = { ...destColumn, tasks: destTasks };

      setColumns(
        Object.values({
          ...columnObject,
          [source.droppableId]: newSourceColumn,
          [destination.droppableId]: newDestColumn,
        })
      );
    } else {
      const column = columns.find(
        (column: IColumn) => column.id === source.droppableId
      );

      const columnObject = columns.reduce((acc: any, value: any) => {
        return { ...acc, [value.id]: value };
      }, {});

      const copiedTasks = [...column!.tasks];

      const [removed] = copiedTasks.splice(source.index, 1);

      copiedTasks.splice(destination.index, 0, removed);

      setColumns(
        Object.values({
          ...columnObject,
          [source.droppableId]: {
            ...column,
            tasks: copiedTasks,
          },
        })
      );
    }
  };
  return (
    <BoardWrapper>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns[0] &&
          columns.map((column, index) => {
            return (
              <Column
                droppableId={column.id}
                key={column.id}
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
