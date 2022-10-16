import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";

import { lightTheme } from "./theme";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.main.background};
`;

function App() {
  const [themeMode, setThemeMode] = useState("lightTheme");

  return (
    <ThemeProvider theme={lightTheme}>
      <AppWrapper>
        <Navbar />
        <Main setTheme={setThemeMode} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
