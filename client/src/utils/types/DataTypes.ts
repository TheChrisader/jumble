export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  statusID?: number;
  subtasks?: ISubtask[];
}

export interface IColumn {
  id: number;
  name: string;
  tasks?: ITask[];
}

export interface IBoard {
  id: number;
  name: string;
  columns: IColumn[];
}
