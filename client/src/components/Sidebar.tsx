import React from "react";
import styled from "styled-components";
import { IBoard } from "../utils/types/DataTypes";
import ThemeToggle from "./ThemeToggle";

interface ISidebar {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  boards: IBoard[];
}

const SidebarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  min-width: 300px;
  max-width: 300px;
  height: calc(100% - 96px);
  padding: 10px 25px;
  background-color: ${(props) => props.theme.colors.main.white};
  border-right: 1px solid ${(props) => props.theme.colors.main.border};
  border-top: none;
  z-index: 20;
  cursor: default;
`;

const BoardCount = styled.h3`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const BoardList = styled.ul`
  width: 100%;
  margin-bottom: auto;
  list-style: none;
`;

const BoardItem = styled.li`
  background-color: ${(props) => props.theme.colors.main.primary.default};
  color: ${(props) => props.theme.colors.text.white};
  padding: 10px;
  margin-bottom: 10px;
`;

const CreateBoard = styled.div`
  color: ${(props) => props.theme.colors.main.primary.default};
  margin-top: 10px;
`;

const HideWrapper = styled.div`
  padding: 10px;
  display: flex;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: 10px;
`;

const Sidebar: React.FC<ISidebar> = ({ setTheme, boards }) => {
  return (
    <SidebarWrapper>
      <BoardCount>ALL BOARDS ({boards.length})</BoardCount>
      <BoardList>
        {boards.map((board: IBoard, i) => (
          <BoardItem key={i}>{board.name}</BoardItem>
        ))}
        <CreateBoard>+Create a New Board</CreateBoard>
      </BoardList>
      <ThemeToggle setTheme={setTheme} />
      <HideWrapper>Hide Sidebar</HideWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
