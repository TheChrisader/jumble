import React from "react";
import styled from "styled-components";

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
`;

const ColumnText = styled.h3`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 25px;
  text-align: center;
`;

const AddColumn = () => {
  return (
    <NewColumnWrapper>
      <ColumnText>Add New Column</ColumnText>
    </NewColumnWrapper>
  );
};

export default AddColumn;
