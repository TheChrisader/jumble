import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const ModalBackdrop = () => {
  return <Backdrop />;
};

export default ModalBackdrop;
