import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

interface ISelect {
  options: string[];
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

interface ITrigger {
  open: boolean;
}

const SelectWrapper = styled.div`
  display: flex;
  width: 250px;
  position: relative;
`;

const Trigger = styled.button<ITrigger>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: inherit;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid
    ${(props) =>
      props.open
        ? props.theme.colors.main.primary.default
        : props.theme.colors.text.secondary};
  padding: 8px 15px;
  text-transform: capitalize;
  transition: border 0.25s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: 0;
    border-color: ${(props) => props.theme.colors.main.primary.default};
  }
`;

const TriggerText = styled.span<ITrigger>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 10px;
  color: ${(props) =>
    props.open ? props.theme.colors.main.primary.default : "inherit"};
`;

const TriggerIcon = styled(FaChevronDown)<ITrigger>`
  color: ${(props) =>
    props.open ? props.theme.colors.main.primary.default : "inherit"};
  transform: ${(props) => (props.open ? "rotate(180deg)" : "none")};
  transition: transform 0.35s, color 0.5s;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  height: fit-content;
  bottom: -300%;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.main.background};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Option = styled.button`
  display: flex;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 15px;
  text-transform: capitalize;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.primary.background};
  }
`;

const OptionText = styled.span``;

const Select: React.FC<ISelect> = ({ options, status, setStatus }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (item: string) => {
    setStatus(item);
    setOpen(false);
  };
  return (
    <SelectWrapper>
      <Trigger role="combobox" open={open} onClick={() => setOpen(!open)}>
        <TriggerText open={open}>{status}</TriggerText>
        <TriggerIcon open={open} />
      </Trigger>
      {open && (
        <OptionsWrapper>
          {options.map((item: string, index: number) => (
            <Option
              role="option"
              key={index}
              onClick={() => handleChange(item)}
            >
              <OptionText>{item}</OptionText>
            </Option>
          ))}
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
};

export default Select;
