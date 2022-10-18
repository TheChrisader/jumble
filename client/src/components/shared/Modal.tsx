import React from "react";
import styled from "styled-components";
import ModalBackdrop from "./ModalBackdrop";
import ModalPopup from "./ModalPopup";

interface IModal {
  children: JSX.Element;
}

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <ModalWrapper>
      <ModalPopup>{children}</ModalPopup>
      <ModalBackdrop />
    </ModalWrapper>
  );
};

export default Modal;
