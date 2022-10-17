export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  statusID?: number;
  subtasks?: ISubtask[];
}

export interface IColumn {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  id?: string;
  name?: string;
  columns: IColumn[];
}

export interface ITheme {
  mode: string;
  colors: {
    main: {
      primary: {
        default: string;
        light: string;
        dark: string;
        border: string;
        background: string;
      };
      success: {
        default: string;
        light: string;
        dark: string;
        border: string;
        background: string;
      };
      danger: {
        default: string;
        light: string;
        dark: string;
        border: string;
        background: string;
      };
      border: string;
      background: string;
      white: string;
    };
    text: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
    };
  };
}
