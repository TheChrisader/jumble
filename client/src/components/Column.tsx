import React, { memo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

interface IColumnComponent {
  droppableId: any;
  column: any;
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
  border: ${(props) => (props.empty ? "2px dashed #ccc" : "none")};
  border-radius: 5px;
`;

const Column: React.FC<IColumnComponent> = ({ droppableId, column, index }) => {
  return (
    <ColumnWrapper>
      <ColumnHeader>
        {column.name}({column.items.length})
      </ColumnHeader>
      <Droppable droppableId={droppableId} key={droppableId}>
        {(provided, snapshot) => {
          return (
            <TasksWrapper
              empty={column.items.length === 0}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {column?.items?.map((item: any, index: number) => {
                return <Task key={item.id} item={item} index={index} />;
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
