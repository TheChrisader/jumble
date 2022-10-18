import React, { useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";

interface IDropDown {
  text: string;
}

const DropDownWrapper = styled.div`
  z-index: 52;
  display: flex;
  position: relative;
  height: fit-content;
  width: fit-content;
`;

const DropButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  position: relative;
  min-width: 22px;
  opacity: 1;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
`;

const DropIcon = styled(FaEllipsisV)`
  font-size: 20px;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  top: 180%;
  left: -450%;
  display: flex;
  gap: 5px;
  align-items: flex-start;
  flex-direction: column;
  width: 200px;
  background-color: ${(props) => props.theme.colors.main.background};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 5px rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
`;

const Option = styled.button`
  color: ${(props) => props.theme.colors.text.secondary};
  display: flex;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: transparent;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.primary.background};
  }
`;

const DropDown = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <DropDownWrapper>
      <DropButton
        type="button"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <DropIcon />
      </DropButton>
      {openDropDown && (
        <OptionsWrapper>
          <Option type="button">Edit</Option>
          <Option type="button">Delete</Option>
        </OptionsWrapper>
      )}
    </DropDownWrapper>
  );
};

export default DropDown;
