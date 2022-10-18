import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface IPopup {
  children: JSX.Element;
}

const Popup = styled.div`
  position: relative;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 10px;
  z-index: 51;
  width: 50%;
  transition: width 0.5s ease;

  @media screen and (max-width: 800px) {
    width: 80%;
  }

  @media screen and (max-width: 550px) {
    width: 95%;
  }
`;

const CloseModal = styled.button`
  position: absolute;
  top: 18px;
  right: 12px;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 20px;
  color: ${(props) => props.theme.colors.main.primary.default};
  cursor: pointer;
  transform-origin: center;
  transition: transform 0.25s;

  &:hover {
    color: ${(props) => props.theme.colors.main.primary.light};
    transform: scale(1.25);
  }
`;

const ModalPopup: React.FC<IPopup> = ({ children }) => {
  return (
    <Popup>
      <CloseModal>
        <FaTimes />
      </CloseModal>
      {children}
    </Popup>
  );
};

export default ModalPopup;
