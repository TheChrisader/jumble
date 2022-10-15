import React from "react";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

interface ISidebar {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  padding: 10px 25px;
  background-color: ${(props) => props.theme.colors.main.white};
  border: 1px solid ${(props) => props.theme.colors.main.border};
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

const Sidebar: React.FC<ISidebar> = ({ setTheme }) => {
  return (
    <SidebarWrapper>
      <BoardCount>ALL BOARDS (2)</BoardCount>
      <BoardList>
        <BoardItem>Platform Launch</BoardItem>
        <CreateBoard>+Create a New Board</CreateBoard>
      </BoardList>
      <ThemeToggle setTheme={setTheme} />
      <HideWrapper>Hide Sidebar</HideWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
