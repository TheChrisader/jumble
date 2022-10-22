import React from "react";
import styled from "styled-components";
import { useModalStore } from "../store/modalStore";
import { useDataStore } from "../store/store";
import { IBoard } from "../utils/types/DataTypes";
import ThemeToggle from "./ThemeToggle";

interface ISidebar {}

interface IBoardItem {
  selected: boolean;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: auto;
  list-style: none;
  padding: 0;
`;

const BoardItem = styled.button<IBoardItem>`
  background-color: ${(props) =>
    props.selected ? props.theme.colors.main.primary.default : "transparent"};
  color: ${(props) =>
    props.selected
      ? props.theme.colors.text.white
      : props.theme.colors.text.secondary};
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${(props) =>
      props.selected
        ? props.theme.colors.main.primary.default
        : props.theme.colors.main.primary.background};
  }
`;

const CreateBoard = styled.button`
  color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.main.primary.default
      : props.theme.colors.main.primary.light};
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s, font-size 0.5s;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.main.background};
    font-weight: 600;
    font-size: 16px;
  }
`;

const HideWrapper = styled.div`
  padding: 10px;
  display: flex;
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: 10px;
`;

const Sidebar: React.FC<ISidebar> = () => {
  const boards = useDataStore((state: any) => state.data);
  const boardTab = useDataStore((state: any) => state.boardTab);
  const setTab = useDataStore((state: any) => state.setTab);
  const setStatus = useDataStore((state: any) => state.setCurrentStatus);
  const openModal = useModalStore((state: any) => state.openModal);
  return (
    <SidebarWrapper>
      <BoardCount>ALL BOARDS ({boards.length})</BoardCount>
      <BoardList>
        {boards.map((board: IBoard, i: number) => (
          <BoardItem
            selected={boardTab === board.name}
            key={i}
            onClick={() => {
              setTab(board.name);
              setStatus(board.name);
            }}
          >
            {board.name}
          </BoardItem>
        ))}
        <CreateBoard onClick={() => openModal({ type: "New Board" })}>
          +Create a New Board
        </CreateBoard>
      </BoardList>
      <ThemeToggle />
      <HideWrapper>Hide Sidebar</HideWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
