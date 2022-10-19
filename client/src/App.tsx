import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";

import { lightTheme } from "./theme";
import { ITheme } from "./utils/types/DataTypes";
import { checkStorageKey, updateTheme } from "./utils/helpers";
import { useThemeStore } from "./store/themeStore";
import { useDataStore } from "./store/store";
import Modal from "./components/shared/Modal";
import DeleteTask from "./components/Modals/DeleteTask";
import ViewTask from "./components/Modals/ViewTask";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.main.background};
`;

function App() {
  const theme = useThemeStore((state: any) => state.theme);
  const boards = useDataStore((state: any) => state.data);
  const setBoards = useDataStore((state: any) => state.setData);
  const setTab = useDataStore((state: any) => state.setTab);

  const fetchData = async () => {
    const response = await import("./utils/data.json");
    setBoards(response.boards);
    setTab(response.boards[0].name);
  };

  useEffect(() => {
    const dataStorage = checkStorageKey("data");
    if (!dataStorage || boards.length === 0) {
      fetchData();
    }
  }, [theme]);

  return (
    <ThemeProvider theme={updateTheme(theme, lightTheme)}>
      <AppWrapper>
        {/* <Modal>
          <DeleteTask name="Task Master" type="Task" />
          <ViewTask />
        </Modal> */}
        <Navbar />
        <Main data={boards} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
