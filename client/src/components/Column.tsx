import React, { memo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";
import { IColumn } from "../utils/types/DataTypes";

interface IColumnComponent {
  droppableId: string;
  column: IColumn;
  index: any;
}

interface ITasksWrapper {
  empty: boolean;
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const ColumnHeader = styled.h2`
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 20px;
  width: 100%;
  text-align: start;
`;

const TasksWrapper = styled.div<ITasksWrapper>`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border: ${(props) =>
    props.empty ? `2px dashed ${props.theme.colors.main.border} ` : ` none`};
  border-radius: 5px;
`;

const Column: React.FC<IColumnComponent> = ({ droppableId, column, index }) => {
  return (
    <ColumnWrapper>
      <ColumnHeader>
        {column.name}({column.tasks.length})
      </ColumnHeader>
      <Droppable droppableId={droppableId} key={droppableId}>
        {(provided, snapshot) => {
          return (
            <TasksWrapper
              empty={column.tasks.length === 0}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {column?.tasks?.map((task: any, index: number) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </TasksWrapper>
          );
        }}
      </Droppable>
    </ColumnWrapper>
  );
};

export default memo(Column);
