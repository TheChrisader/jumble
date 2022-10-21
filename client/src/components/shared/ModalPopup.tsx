import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useModalStore } from "../../store/modalStore";

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
  width: 40%;
  max-height: 100%;
  overflow-y: auto;
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
  top: 12px;
  right: 15px;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 25px;
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
  const closeModal = useModalStore((state: any) => state.closeModal);
  return (
    <Popup>
      <CloseModal onClick={closeModal}>
        <FaTimes />
      </CloseModal>
      {children}
    </Popup>
  );
};

export default ModalPopup;
