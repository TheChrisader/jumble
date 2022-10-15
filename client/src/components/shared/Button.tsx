import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  color: ${(props) => props.theme.colors.text.white};
  gap: 10px;
  font-weight: 500;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.main.primary.default};
  height: fit-content;
  transition: background-color 0.25s ease;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.main.primary.light};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.main.primary.dark};
  }
`;

export default Button;
