import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";

interface IDropDown {
  text?: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

interface IOption {
  $alt?: boolean;
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
  border-radius: 50px;
  padding: 5px;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.background};
  }
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
  background-color: ${(props) => props.theme.colors.main.white};
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 5px rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
`;

const Option = styled.button<IOption>`
  color: ${(props) =>
    props.$alt
      ? props.theme.colors.main.danger.light
      : props.theme.colors.text.secondary};
  display: flex;
  justify-content: center;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: transparent;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.main.background};
  }
`;

const DropDown: React.FC<IDropDown> = ({
  text,
  onClickEdit,
  onClickDelete,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(() => {
    setOpenDropDown(false);
  }, []);

  useOnClickOutside(
    dropdownRef as React.MutableRefObject<HTMLDivElement>,
    handleOutsideClick
  );

  return (
    <DropDownWrapper ref={dropdownRef}>
      <DropButton
        type="button"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <DropIcon />
      </DropButton>
      {openDropDown && (
        <OptionsWrapper>
          <Option
            type="button"
            onClick={() => {
              onClickEdit();
              setOpenDropDown(false);
            }}
          >
            EDIT {text?.toUpperCase()}
          </Option>
          <Option
            $alt
            type="button"
            onClick={() => {
              onClickDelete();
              setOpenDropDown(false);
            }}
          >
            DELETE {text?.toUpperCase()}
          </Option>
        </OptionsWrapper>
      )}
    </DropDownWrapper>
  );
};

export default DropDown;
