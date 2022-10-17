import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import produce from "immer";

import { IBoard, IColumn, ITask } from "../utils/types/DataTypes";
import { onDragDropTasks } from "./storeActions";

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
          set((state: any) => {
            return onDragDropTasks(state, boardID, newBoard, newTask, newColID);
          }),
      }),
      { name: "data" }
    ),
    { name: "dataStore" }
  )
);
