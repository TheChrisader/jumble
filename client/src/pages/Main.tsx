import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";

import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import { IBoard } from "../utils/types/DataTypes";

interface IMain {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  data: IBoard[];
}

const Scroll = styled(ScrollContainer)`
  display: flex;
  position: relative;
  height: calc(100vh - 96px);
  cursor: move;
`;

const Main: React.FC<IMain> = ({ data, setTheme }) => {
  return (
    <Scroll
      nativeMobileScroll={true}
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".Card"}
    >
      <Sidebar boards={data} setTheme={setTheme} />
      {data[0]?.columns && <Board board={data[0]} />}
    </Scroll>
  );
};

export default Main;
