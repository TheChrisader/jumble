import React from "react";
import styled from "styled-components";
import { useModalStore } from "../../store/modalStore";

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const ModalBackdrop = () => {
  const closeModal = useModalStore((state: any) => state.closeModal);
  return <Backdrop onClick={closeModal} />;
};

export default ModalBackdrop;
