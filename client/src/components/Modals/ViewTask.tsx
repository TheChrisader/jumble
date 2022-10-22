import React from "react";
import styled from "styled-components";
import { useModalStore } from "../../store/modalStore";
import { ISubtask } from "../../utils/types/DataTypes";
import Checkbox from "../shared/Checkbox";
import DropDown from "../shared/DropDown";
import Select from "../shared/Select";

const ViewTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const TaskTitle = styled.h1`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 25px;
  color: ${(props) => props.theme.colors.main.primary.default};
`;

const TaskDescription = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 400;
  margin-bottom: 30px;
`;

const Heading = styled.h3`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 30px;
`;

const ViewTask = () => {
  const openModal = useModalStore((state: any) => state.openModal);
  const { detail, statusArr, boardTab } = useModalStore((state: any) => state);
  const [status, setStatus] = React.useState(boardTab);

  return (
    <ViewTaskContainer>
      <TitleContainer>
        <TaskTitle>{detail.title}</TaskTitle>
        <DropDown
          text="task"
          onClickEdit={() => openModal({ type: "Edit Task" })}
          onClickDelete={() => openModal({ type: "Delete Task" })}
        />
      </TitleContainer>
      <TaskDescription>
        {detail.description || "No description."}
      </TaskDescription>
      <Heading>Subtasks (0 of {detail.subtasks.length})</Heading>
      <CheckboxContainer>
        {detail.subtasks.map((subtask: ISubtask) => {
          return (
            <Checkbox checked={subtask.isCompleted}>{subtask.title}</Checkbox>
          );
        })}
      </CheckboxContainer>
      <Heading>Current Status</Heading>
      <Select options={statusArr} status={status} setStatus={setStatus} />
    </ViewTaskContainer>
  );
};

export default ViewTask;
