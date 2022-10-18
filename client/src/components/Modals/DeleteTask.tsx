import React from "react";
import styled from "styled-components";

import Button from "../shared/Button";

const DeleteTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.main.danger.light};
`;

const DeleteText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteTask = () => {
  return (
    <DeleteTaskContainer>
      <DeleteTitle>Delete this Task</DeleteTitle>
      <DeleteText>
        Are you sure you want to delete the 'Build UI for search' board? This
        action will remove all columns and tasks and cannot be reversed.
      </DeleteText>
      <ButtonsContainer>
        <Button>Delete</Button>
        <Button>Cancel</Button>
      </ButtonsContainer>
    </DeleteTaskContainer>
  );
};

export default DeleteTask;
