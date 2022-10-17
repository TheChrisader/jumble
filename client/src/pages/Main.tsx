import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";

import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import { useDataStore } from "../store/store";
import { IBoard } from "../utils/types/DataTypes";

interface IMain {
  data: IBoard[];
}

const Scroll = styled(ScrollContainer)`
  display: flex;
  position: relative;
  height: calc(100vh - 96px);
  cursor: move;
`;

const Main: React.FC<IMain> = ({ data }) => {
  const boards = useDataStore((state: any) => state.data);
  return (
    <Scroll
      nativeMobileScroll={true}
      vertical={false}
      hideScrollbars={false}
      ignoreElements={".Card"}
    >
      <Sidebar />
      {boards.length === 0 ? "Loading..." : <Board />}
    </Scroll>
  );
};

export default Main;
