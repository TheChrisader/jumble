import produce from "immer";

import { IBoard, IColumn, ITask } from "../utils/types/DataTypes";
import { DataState } from "./store";

export const onDragDropTasks = (
  state: DataState,
  boardID: string,
  newBoard: IBoard,
  newTask: ITask,
  newColID: string
): DataState => {
  const data = state.data;

  const exist = data.find((item: any) => item.id === boardID);

  if (exist) {
    const newState = produce(data, (draft: any) => {
      const boardCopy = { ...newBoard };

      const boardIndex = data.findIndex((item: IBoard) => item.id === boardID);

      const colIndex = boardCopy.columns.findIndex(
        (item: IColumn) => item.id === newColID
      );

      const taskIndex = boardCopy.columns[colIndex].tasks.findIndex(
        (item: ITask) => item.id === newTask.id
      );

      boardCopy.columns[colIndex].tasks[taskIndex] = {
        ...boardCopy.columns[colIndex].tasks[taskIndex],
        status: boardCopy.columns[colIndex].name,
      };

      draft[boardIndex] = boardCopy;
    });

    return { ...state, data: newState };
  } else {
    console.error("drag/drop err");
    return state;
  }
};
