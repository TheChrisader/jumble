import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import { IBoard, ITask } from "../utils/types/DataTypes";
import {
  onAddBoard,
  onAddTask,
  onDeleteBoard,
  onDeleteTask,
  onDragDropTasks,
  onEditBoard,
  onEditTask,
  setBoardStatuses,
} from "./storeActions";

export interface DataState {
  data: IBoard[];
  currentBoardStatus: string[];
  boardTab?: string;
}

const initialState: DataState = {
  data: [],
  currentBoardStatus: [],
  boardTab: "Board Tab",
};

export const useDataStore = create(
  devtools(
    persist(
      (set) => ({
        data: initialState.data,

        currentBoardStatus: initialState.currentBoardStatus,

        boardTab: initialState.boardTab,

        setTab: (payload: string) => set({ boardTab: payload }),

        setData: (payload: any) => set({ data: payload }),

        setTasks: (
          boardID: string,
          newBoard: IBoard,
          newTask: ITask,
          newColID: string
        ) =>
          set((state: DataState) =>
            onDragDropTasks(state, boardID, newBoard, newTask, newColID)
          ),

        setCurrentStatus: (boardTab: string) =>
          set((state: DataState) => setBoardStatuses(state, boardTab)),

        addBoard: (newBoard: IBoard) =>
          set((state: DataState) => onAddBoard(state, newBoard)),

        editBoard: (boardTab: string, newBoard: IBoard) =>
          set((state: DataState) => onEditBoard(state, boardTab, newBoard)),

        addTask: (boardTab: string, newTask: ITask) =>
          set((state: DataState) => onAddTask(state, boardTab, newTask)),

        editTask: (boardTab: string, newTask: ITask, oldTask: ITask) =>
          set((state: DataState) =>
            onEditTask(state, boardTab, newTask, oldTask)
          ),

        deleteBoard: (boardTab: string) =>
          set((state: DataState) => onDeleteBoard(state, boardTab)),

        deleteTask: (boardTab: string, task: ITask) =>
          set((state: any) => onDeleteTask(state, boardTab, task)),
      }),
      { name: "data" }
    ),
    { name: "dataStore" }
  )
);
