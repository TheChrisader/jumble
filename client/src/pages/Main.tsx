import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";

import Board from "../components/Board";
import Sidebar from "../components/Sidebar";

interface IMain {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Scroll = styled(ScrollContainer)`
  display: flex;
  position: relative;
  height: calc(100vh - 96px);
  cursor: move;
`;

const Main: React.FC<IMain> = ({ setTheme }) => {
  return (
    <Scroll
      nativeMobileScroll={true}
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".Card"}
    >
      <Sidebar setTheme={setTheme} />
      <Board />
    </Scroll>
  );
};

export default Main;
