import React, { memo } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { ISubtask, ITask } from "../utils/types/DataTypes";
import { useModalStore } from "../store/modalStore";
import { useDataStore } from "../store/store";

interface ITaskComponent {
  task: ITask;
  index: number;
}

interface ITaskCard {
  isDragging: boolean;
}

const TaskCard = styled.div<ITaskCard>`
  user-select: none;
  padding: 10px 20px;
  min-height: 50px;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) =>
    props.theme.mode !== "dark"
      ? props.theme.colors.main.primary.default
      : props.theme.colors.main.primary.light};
  border-radius: 5px;
  box-shadow: 0 5px 5px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  cursor: drag;
  margin-bottom: 20px;
`;

const TaskTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Subtasks = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
`;

const Task: React.FC<ITaskComponent> = ({ task, index }) => {
  const openModal = useModalStore((state: any) => state.openModal);
  const statusArr = useDataStore((state: any) => state.currentBoardStatus);
  const boardTab = useDataStore((state: any) => state.boardTab);

  const completed = task?.subtasks?.filter(
    (subtask: ISubtask) => subtask.isCompleted === true
  );

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            className="Card"
            onClick={() =>
              openModal({
                type: "View Task",
                detail: task,
                statusArr: statusArr,
                boardTab: boardTab,
              })
            }
          >
            <TaskTitle>{task.title}</TaskTitle>
            <Subtasks>
              {completed?.length} of {task?.subtasks?.length} subtasks completed
            </Subtasks>
          </TaskCard>
        );
      }}
    </Draggable>
  );
};

export default memo(Task);
