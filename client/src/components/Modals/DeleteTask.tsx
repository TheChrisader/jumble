import React from "react";
import styled from "styled-components";

import Button from "../shared/Button";

interface IDelete {
  type: string;
  name: string;
}

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
`;

const Buttons = styled(Button)`
  width: 250px;
`;

const DeleteTask: React.FC<IDelete> = ({ type, name }) => {
  return (
    <DeleteTaskContainer>
      <DeleteTitle>Delete this {type}</DeleteTitle>
      <DeleteText>
        Are you sure you want to delete the '{name}' {type.toLowerCase()}? This
        action will remove{" "}
        {type === "Board" ? "all columns and tasks" : "this task"} and cannot be
        reversed.
      </DeleteText>
      <ButtonsContainer>
        <Buttons color="danger">Delete</Buttons>
        <Buttons variant="outlined">Cancel</Buttons>
      </ButtonsContainer>
    </DeleteTaskContainer>
  );
};

export default DeleteTask;
