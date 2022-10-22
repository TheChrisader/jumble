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

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.main.primary.default};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.main.primary.dark};
  }

  ::-webkit-scrollbar-corner {
    background: ${(props) => props.theme.colors.main.background};
  }
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
