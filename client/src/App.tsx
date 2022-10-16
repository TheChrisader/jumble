import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";

import { lightTheme } from "./theme";
import { ITheme } from "./utils/types/DataTypes";
import { updateTheme } from "./utils/helpers";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.main.background};
`;

function App() {
  const [themeMode, setThemeMode] = useState("lightTheme");
  const [theme, setTheme] = useState<ITheme>(lightTheme);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    const response = await import("./utils/data.json");
    setData(response.boards);
  };

  useEffect(() => {
    setTheme(updateTheme(themeMode, lightTheme));
    fetchData();
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Navbar />
        <Main data={data} setTheme={setThemeMode} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
