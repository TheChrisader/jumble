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

export const setBoardStatuses = (state: DataState, boardTab: string) => {
  const data = state.data;

  const board = data.find((item) => item.name === boardTab);

  const statusArr = board?.columns.map((item) => item.name);

  return { ...state, currentBoardStatus: statusArr };
};

export const onAddBoard = (state: DataState, newBoard: IBoard) => {
  const data = state.data;

  const newState = produce(data, (draft) => {
    draft.push(newBoard);
  });

  return { ...state, data: newState };
};

export const onEditBoard = (
  state: DataState,
  boardTab: string,
  newBoard: IBoard
) => {
  const data = state.data;

  const oldBoard = data.find((item) => item.name === boardTab);

  if (oldBoard) {
    const newBoardIndex = data.findIndex((item) => item.name === boardTab);

    const newState = produce(data, (draft) => {
      draft[newBoardIndex] = newBoard;
    });
    return { ...state, data: newState };
  } else console.error("on edit board err");
};

export const onAddTask = (
  state: DataState,
  boardTab: string,
  newTask: ITask
) => {
  const data = state.data;

  const board = data.find((item) => item.name === boardTab);

  if (board) {
    const boardIndex = data.findIndex((item) => item.name === boardTab);

    const columnIndex = board.columns.findIndex(
      (item) => item.name === newTask.status
    );

    const newState = produce(data, (draft) => {
      draft[boardIndex].columns[columnIndex].tasks.push(newTask);
    });

    return { ...state, data: newState };
  } else console.error("add task err");
};

export const onEditTask = (
  state: DataState,
  boardTab: string,
  newTask: ITask,
  oldTask: ITask
) => {
  const data = state.data;

  const board = data.find((item) => item.name === boardTab);

  const oldBoardIndex = data.findIndex((item) => item.name === boardTab);

  const oldColumnIndex = board!.columns.findIndex((item) =>
    item.tasks.find((task) => task.id === oldTask.id)
  );

  const newColumnIndex = board!.columns.findIndex(
    (item) => item.name === newTask.status
  );

  const taskIndex = board!.columns[oldColumnIndex].tasks.findIndex(
    (task) => task.id === oldTask.id
  );

  const newState = produce(data, (draft) => {
    if (
      newTask.status?.toLowerCase() !== oldTask.status?.toLowerCase() ||
      oldColumnIndex !== newColumnIndex
    ) {
      draft[oldBoardIndex].columns[oldColumnIndex].tasks.splice(taskIndex, 1);

      draft[oldBoardIndex].columns[newColumnIndex].tasks.push(newTask);
    } else {
      draft[oldBoardIndex].columns[oldColumnIndex].tasks[taskIndex] = newTask;
    }
  });

  return { ...state, data: newState };
};

export const onDeleteBoard = (state: DataState, boardTab: string) => {
  const data = state.data;

  const board = data.find((item) => item.name === boardTab);

  if (board) {
    const boardIndex = data.findIndex((item) => item.name === boardTab);

    const newState = produce(data, (draft) => {
      draft.splice(boardIndex, 1);
    });

    return { ...state, data: newState };
  } else {
    console.error("on delete board err");
  }
};

export const onDeleteTask = (
  state: DataState,
  boardTab: string,
  task: ITask
) => {
  const data = state.data;

  const board = data.find((item) => item.name === boardTab);

  if (board) {
    const boardIndex = data.findIndex((item) => item.name === boardTab);

    const columnIndex = board.columns.findIndex((column) =>
      column.tasks.find((item) => item.id === task.id)
    );

    const taskIndex = board.columns[columnIndex].tasks.findIndex(
      (item) => item.id === task.id
    );

    const newState = produce(data, (draft) => {
      draft[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
    });

    return { ...state, data: newState };
  } else {
    console.error("on delete task err");
  }
};
