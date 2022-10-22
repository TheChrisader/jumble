import React from "react";
import { useField, ErrorMessage as FormikError, FieldInputProps } from "formik";
import styled from "styled-components";

interface ITextArea extends React.ComponentPropsWithoutRef<"textarea"> {
  label: string;
  name: string;
}

interface IInput extends FieldInputProps<any> {
  valid: boolean;
}

const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const InputLabel = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 400;
  margin-bottom: 5px;
`;

const StyledTextArea = styled.textarea<IInput>`
  height: fit-content;
  max-height: 100px;
  min-height: fit-content;
  max-width: 100%;
  min-width: 100%;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.main.white
      : props.theme.colors.main.primary.dark};
  border: 1px solid
    ${(props) =>
      props.valid
        ? props.theme.colors.main.primary.border
        : props.theme.colors.main.danger.default};
  border-radius: 5px;
  padding: 15px;
  transition: border 0.1s;
  &:active,
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.main.primary.default};
  }
`;

const ErrorMessage = styled(FormikError)`
  color: ${(props) => props.theme.colors.main.danger.default};
`;

const TextArea: React.FC<ITextArea> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <StyledTextArea
          {...field}
          valid={!(meta.touched && meta.error)}
          {...props}
        />
        <ErrorMessage name={name} component="span" />
      </InputWrapper>
    </>
  );
};

export default TextArea;
