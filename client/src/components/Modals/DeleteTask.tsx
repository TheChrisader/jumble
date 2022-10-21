import React from "react";
import styled from "styled-components";
import { useModalStore } from "../../store/modalStore";
import { useDataStore } from "../../store/store";

import Button from "../shared/Button";

interface IDelete {}

const DeleteTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.main.danger.light};
`;

const DeleteText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 25px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const Buttons = styled(Button)`
  width: 200px;

  @media screen and (max-width: 400px) {
    width: 100px;
  }
`;

const DeleteTask: React.FC<IDelete> = () => {
  const { type, detail } = useModalStore((state: any) => state);
  const { boardTab, deleteTask, deleteBoard } = useDataStore(
    (state: any) => state
  );
  const closeModal = useModalStore((state: any) => state.closeModal);

  const modalType = type.split(" ")[1];

  const handleDelete = () => {
    if (modalType === "Task") {
      deleteTask(boardTab, detail);
    } else {
      deleteBoard(boardTab);
    }
    closeModal();
  };
  return (
    <DeleteTaskContainer>
      <DeleteTitle>Delete this {modalType}</DeleteTitle>
      <DeleteText>
        Are you sure you want to delete the '
        {modalType === "Task" ? detail.title : boardTab}'{" "}
        {modalType.toLowerCase()}? This action will remove{" "}
        {modalType === "Board" ? " all columns and tasks" : "this task"} and
        cannot be reversed.
      </DeleteText>
      <ButtonsContainer>
        <Buttons variant="outlined" onClick={closeModal}>
          Cancel
        </Buttons>
        <Buttons color="danger" onClick={handleDelete}>
          Delete
        </Buttons>
      </ButtonsContainer>
    </DeleteTaskContainer>
  );
};

export default DeleteTask;
