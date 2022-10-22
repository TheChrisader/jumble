import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useField } from "formik";
import { FaChevronDown } from "react-icons/fa";

import useOnClickOutside from "../../utils/hooks/useOnClickOutside";

interface ISelect {
  options: string[];
  status: string;
  name?: string;
  setStatus?: React.Dispatch<React.SetStateAction<string>>;
}

interface ITrigger {
  open: boolean;
}

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
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
        ? props.theme.colors.main.primary.background
        : props.theme.colors.main.background};
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
  color: ${(props) => props.theme.colors.main.primary.default};
  transform: ${(props) => (props.open ? "rotate(180deg)" : "none")};
  transition: transform 0.35s, color 0.5s;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  max-height: 150px;
  flex-direction: column;
  height: fit-content;
  /* bottom: -300%; */
  bottom: 40px;
  /* transform: translateY(40px); */
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.main.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 5px 10px 5px rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
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
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.primary.background};
  }
`;

const OptionText = styled.span``;

const SelectFormik: React.FC<ISelect> = ({ name, options, status }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const helpers = useField(name!)[2];

  const { setValue } = helpers;

  const handleChange = (item: string) => {
    setValue(item);
    setOpen(false);
  };

  const handleClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  useOnClickOutside(
    dropdownRef as React.MutableRefObject<HTMLDivElement>,
    handleClickOutside
  );

  return (
    <SelectWrapper ref={dropdownRef}>
      <Trigger
        type="button"
        role="combobox"
        open={open}
        onClick={() => setOpen(!open)}
      >
        <TriggerText open={open}>{status}</TriggerText>
        <TriggerIcon open={open} />
      </Trigger>
      {open && (
        <OptionsWrapper>
          {options.map((item: string, index: number) => (
            <Option
              role="option"
              type="button"
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

const SelectUseState: React.FC<ISelect> = ({ options, status, setStatus }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (item: string) => {
    setStatus!(item);
    setOpen(false);
  };

  const handleClickOutside = useCallback(() => {
    setOpen(false);
  }, []);

  useOnClickOutside(
    dropdownRef as React.MutableRefObject<HTMLDivElement>,
    handleClickOutside
  );

  return (
    <SelectWrapper ref={dropdownRef}>
      <Trigger
        type="button"
        role="combobox"
        open={open}
        onClick={() => setOpen(!open)}
      >
        <TriggerText open={open}>{status}</TriggerText>
        <TriggerIcon open={open} />
      </Trigger>
      {open && (
        <OptionsWrapper>
          {options.map((item: string, index: number) => (
            <Option
              role="option"
              type="button"
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

const Select: React.FC<ISelect> = ({ name, options, status, setStatus }) => {
  if (name) {
    return <SelectFormik name={name} options={options} status={status} />;
  } else if (setStatus) {
    return (
      <SelectUseState options={options} status={status} setStatus={setStatus} />
    );
  } else {
    return <></>;
  }
};

export default Select;
