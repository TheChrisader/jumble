import React from "react";
import styled from "styled-components";
import { useModalStore } from "../../store/modalStore";
import { useDataStore } from "../../store/store";
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
  color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.main.primary.default
      : props.theme.colors.main.primary.light};
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
  const { detail, statusArr, boardTab, openModal, setDetail } = useModalStore(
    (state: any) => state
  );
  const { editTask } = useDataStore((state: any) => state);

  const [status, setStatus] = React.useState(detail.status);
  const [subtasks, setSubtasks] = React.useState(detail.subtasks);

  const completed = subtasks.filter(
    (subtask: ISubtask) => subtask.isCompleted === true
  );

  React.useEffect(() => {
    const task = {
      ...detail,
      subtasks: subtasks,
    };
    editTask(boardTab, task, detail);
    setDetail(task);
  }, [subtasks]); //eslint-disable-line

  React.useEffect(() => {
    const task = {
      ...detail,
      status: status,
    };
    editTask(boardTab, task, detail);
    setDetail(task);
  }, [status]); //eslint-disable-line

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
      <Heading>
        Subtasks ({completed.length} of {detail.subtasks.length})
      </Heading>
      <CheckboxContainer>
        {detail.subtasks.map((subtask: ISubtask, i: number) => {
          return (
            <Checkbox
              key={i}
              index={i}
              subtasks={subtasks}
              setState={setSubtasks}
              checked={subtask.isCompleted}
            >
              {subtask.title}
            </Checkbox>
          );
        })}
      </CheckboxContainer>
      <Heading>Current Status</Heading>
      <Select options={statusArr} status={status} setStatus={setStatus} />
    </ViewTaskContainer>
  );
};

export default ViewTask;
