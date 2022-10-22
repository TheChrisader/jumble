import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ITask } from "../utils/types/DataTypes";

interface IModal {
  type: string;
  detail?: ITask;
  statusArr?: string[];
  boardTab?: string;
}

const initialState: IModal = {
  type: "",
  detail: {
    id: "",
  },
  statusArr: [],
  boardTab: "",
};

export const useModalStore = create(
  devtools(
    persist(
      (set) => ({
        type: initialState.type,
        detail: initialState.detail,
        statusArr: initialState.statusArr,
        boardTab: initialState.boardTab,

        openModal: (payload: IModal) =>
          set((state: any) => ({ ...state, ...payload })),

        closeModal: () => set({ type: "" }),
        setDetail: (payload: ITask) => set({ detail: payload }),
      }),
      { name: "modal" }
    ),
    { name: "modalStore" }
  )
);
