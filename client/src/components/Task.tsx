import React, { memo } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../utils/types/DataTypes";

interface ITaskComponent {
  task: ITask;
  index: number;
}

interface ITaskCard {
  isDragging: boolean;
}

const TaskCard = styled.div<ITaskCard>`
  user-select: none;
  padding: 16px 20px;
  min-height: 50px;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 10px;
  box-shadow: 0 5px 5px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  cursor: drag;
  border: 1px solid ${(props) => props.theme.colors.main.border};
  margin-bottom: 20px;
`;

const TaskTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Subtasks = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 15px;
  font-weight: 500;
`;

const Task: React.FC<ITaskComponent> = ({ task, index }) => {
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
          >
            <TaskTitle>{task.title}</TaskTitle>
            <Subtasks>0 of 2 subtasks completed</Subtasks>
          </TaskCard>
        );
      }}
    </Draggable>
  );
};

export default memo(Task);
