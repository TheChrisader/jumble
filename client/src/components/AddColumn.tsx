import React from "react";
import styled from "styled-components";
import { useModalStore } from "../store/modalStore";

const NewColumnWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
  min-height: 100%;
  min-width: 300px;
  background-color: transparent;
  border: 2px dashed ${(props) => props.theme.colors.main.primary.background};
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.5s, background-color 0.5s;

  &:hover {
    transform: scale(1.05);
    background-color: ${(props) => props.theme.colors.main.success.background};
  }
`;

const ColumnText = styled.h3`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 25px;
  text-align: center;
`;

const AddColumn = () => {
  const openModal = useModalStore((state: any) => state.openModal);

  return (
    <NewColumnWrapper onClick={() => openModal({ type: "Edit Board" })}>
      <ColumnText>Add New Column</ColumnText>
    </NewColumnWrapper>
  );
};

export default AddColumn;
