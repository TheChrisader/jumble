import React from "react";
import styled from "styled-components";

interface ICheckbox {
  children: string;
  checked: boolean;
}

interface ILabel {
  checked?: boolean;
}

const Label = styled.label<ILabel>`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.main.background};
  color: ${(props) =>
    props.checked
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.primary};
  border-radius: 15px;
  margin-bottom: 5px;
  font-size: inherit;
  font-weight: inherit;
  user-select: none;
  text-decoration: line-through;
  text-decoration-color: ${(props) =>
    props.checked ? props.theme.colors.text.secondary : "transparent"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.white};
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

const Checkbox: React.FC<ICheckbox> = ({ children, checked }) => {
  const [check, setCheck] = React.useState(false);
  return (
    <Label checked={check}>
      <Input
        type="checkbox"
        checked={check}
        onChange={() => setCheck(!check)}
      />
      {children}
    </Label>
  );
};

export default Checkbox;
