import { ITheme } from "./types/DataTypes";

export const updateTheme = (mode: string, ...args: ITheme[]) => {
  const theme = [...args].find((item: any) => item.mode === mode);

  if (theme) {
    return theme;
  } else {
    return args[0];
  }
};

export const checkStorageKey = (key: string) => {
  return localStorage.getItem(key);
};
