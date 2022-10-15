import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";

import { lightTheme } from "./theme";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.main.background};
`;

function App() {
  const [isThemeLight, setIsThemeLight] = useState(true);

  return (
    <ThemeProvider theme={lightTheme}>
      <AppWrapper>
        <Navbar />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
