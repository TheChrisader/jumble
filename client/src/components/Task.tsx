import React, { memo } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface ITaskComponent {
  item: any;
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
  box-shadow: 6px 18px 10px -13px rgba(161, 159, 159, 0.3);
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

const Task: React.FC<ITaskComponent> = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            className="Card"
          >
            <TaskTitle>{item.content}</TaskTitle>
            <Subtasks>0 of 2 subtasks completed</Subtasks>
          </TaskCard>
        );
      }}
    </Draggable>
  );
};

export default memo(Task);
