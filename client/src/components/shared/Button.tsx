import styled from "styled-components";

interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  children: JSX.Element | string;
  color?: "primary" | "outlined" | "success" | "danger";
  variant?: "default" | "outlined";
}

interface IButtonComponent {
  color: string;
  padding?: string;
}

const ButtonComponent = styled.button<IButtonComponent>`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  color: ${(props) => props.theme.colors.text.white};
  font-weight: 500;
  border: none;
  border-radius: 20px;
  padding: ${(props) => props.padding || "10px 20px"};
  background-color: ${({ color, ...props }) =>
    props.theme.colors.main[color].default};
  height: fit-content;
  transition: background-color 0.25s ease;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${({ color, ...props }) =>
      props.theme.colors.main[color].light};
  }
  &:active {
    background-color: ${({ color, ...props }) =>
      props.theme.colors.main[color].dark};
  }
`;

const OutlinedButton = styled(ButtonComponent)`
  color: ${({ color, ...props }) => props.theme.colors.main[color].default};
  font-weight: 600;
  border: 1px dashed
    ${({ color, ...props }) => props.theme.colors.main[color].light};
  background-color: transparent;
  transition: background-color 0.25s ease, color 0.25s ease,
    border-color 0.25 ease;

  &:hover,
  &:focus {
    background-color: ${({ color, ...props }) =>
      props.theme.colors.main[color].default};
    color: ${({ color, ...props }) => props.theme.colors.text.white};
    border-color: transparent;
  }

  &:active {
    background-color: ${({ color, ...props }) =>
      props.theme.colors.main[color].dark};
  }
`;

const Button: React.FC<IButton> = ({
  children,
  color = "primary",
  variant = "default",
  ...props
}) => {
  if (variant === "outlined") {
    return (
      <OutlinedButton color={color} {...props}>
        {children}
      </OutlinedButton>
    );
  } else {
    return (
      <ButtonComponent color={color} {...props}>
        {children}
      </ButtonComponent>
    );
  }
};

export default Button;
