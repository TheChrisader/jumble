import React from "react";
import styled from "styled-components";
import produce from "immer";

import { ISubtask } from "../../utils/types/DataTypes";

interface ICheckbox {
  subtasks: ISubtask[];
  setState: (state: ISubtask[]) => void;
  index: number;
  children: string;
  checked?: boolean;
}

interface ILabel {
  checked?: boolean;
}

const Label = styled.label<ILabel>`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) =>
    props.checked
      ? props.theme.colors.text.secondary
      : props.theme.mode === "light"
      ? props.theme.colors.main.primary.dark
      : props.theme.colors.main.primary.light};
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: inherit;
  font-weight: inherit;
  user-select: none;
  text-decoration: line-through;
  text-decoration-color: ${(props) =>
    props.checked ? props.theme.colors.text.secondary : "transparent"};
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.background};
  }

  & > input[type="checkbox"] {
    cursor: pointer;
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.checked ? props.theme.colors.main.primary.default : "transparent"};
    margin-right: 10px;
    min-width: 16px;
    height: 16px;
    border: 1px solid ${(props) => props.theme.colors.main.primary.default};
    border-radius: 2px;
    transition: background-color 0.25s, transform 0.25s;

    &:checked {
      border: 0;
      background-color: ${(props) => props.theme.colors.main.primary.default};
    }
  }

  & > input[type="checkbox"]::before {
    content: "";
    width: 10px;
    height: 10px;
    transform-origin: bottom left;
    transform: scale(0);
    background-color: ${(props) => props.theme.colors.main.white};
    clip-path: polygon(14% 40%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  & > input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  & > input[type="checkbox"]:focus-visible {
    outline-offset: max(2px, 17px);
  }

  & > input[type="checkbox"]:disabled {
    color: ${(props) => props.theme.colors.main.background};
    cursor: not-allowed;
  }
`;

const Input = styled.input``;

const Checkbox: React.FC<ICheckbox> = ({
  subtasks,
  index,
  setState,
  children,
  checked,
}) => {
  const [check, setCheck] = React.useState(checked);

  const handleChange = () => {
    setCheck(!check);
    const newSub = produce(subtasks, (draft) => {
      draft[index].isCompleted = !check;
      return draft;
    });
    setState(newSub);
  };
  return (
    <Label checked={check}>
      <Input type="checkbox" checked={check} onChange={handleChange} />
      {children}
    </Label>
  );
};

export default Checkbox;
