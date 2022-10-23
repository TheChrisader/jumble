import React from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { IColumn } from "../utils/types/DataTypes";
import { useDataStore } from "../store/store";
import AddColumn from "./AddColumn";

interface IBoardComponent {}

const BoardWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 300px;
  padding: 40px;
  gap: 35px;
  min-height: 100%;
  transition: left 0.5s;

  @media screen and (max-width: 900px) {
    left: 0;
  }
`;

const Board: React.FC<IBoardComponent> = () => {
  const boardTab = useDataStore((state: any) => state.boardTab);
  const board = useDataStore((state: any) =>
    state.data.find((b: any) => b.name === boardTab)
  );
  const setTasks = useDataStore((state: any) => state.setTasks);

  const onDragEnd = (result: DropResult, columns: IColumn[], setTasks: any) => {
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
      const [task] = sourceTasks.splice(source.index, 1);
      const newSourceColumn = { ...sourceColumn, tasks: sourceTasks };

      const destColumn = columns.find(
        (column: IColumn) => column.id === destination.droppableId
      );
      const destTasks = [...destColumn!.tasks];
      destTasks.splice(destination.index, 0, task);
      const newDestColumn = { ...destColumn, tasks: destTasks };

      const newBoard = {
        ...board,
        columns: Object.values({
          ...columnObject,
          [source.droppableId]: newSourceColumn,
          [destination.droppableId]: newDestColumn,
        }),
      };

      setTasks(board.id, newBoard, task, destination.droppableId);
    } else {
      const column = columns.find(
        (column: IColumn) => column.id === source.droppableId
      );

      const columnObject = columns.reduce((acc: any, value: any) => {
        return { ...acc, [value.id]: value };
      }, {});

      const copiedTasks = [...column!.tasks];

      const [task] = copiedTasks.splice(source.index, 1);

      copiedTasks.splice(destination.index, 0, task);

      const newBoard = {
        ...board,
        columns: Object.values({
          ...columnObject,
          [source.droppableId]: {
            ...column,
            tasks: copiedTasks,
          },
        }),
      };

      setTasks(board.id, newBoard, task, source.droppableId);
    }
  };
  return (
    <BoardWrapper>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, board?.columns, setTasks)}
      >
        {board?.columns?.map((column: IColumn, index: number) => {
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
      <AddColumn />
    </BoardWrapper>
  );
};

export default Board;
