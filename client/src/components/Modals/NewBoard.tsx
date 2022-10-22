import React from "react";
import styled from "styled-components";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { nanoid } from "nanoid";
import { FaTimes } from "react-icons/fa";

import Field from "../shared/Field";
import Button from "../shared/Button";
import { useDataStore } from "../../store/store";
import { useModalStore } from "../../store/modalStore";
import { NewBoardSchema } from "../../utils/Form";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.main.primary.default
      : props.theme.colors.main.primary.light};
  margin-bottom: 20px;
  font-weight: 400;
`;

const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
`;

const ColumnsTitle = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 5px;
`;

const NewColumns = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteColumn = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  height: fit-content;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.25s;

  &:hover {
    color: ${(props) => props.theme.colors.main.danger.default};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.main.background};
  }
`;

const NewColumnButton = styled(Button)`
  align-self: center;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const Submit = styled(Button)`
  align-self: center;
  border-radius: 5px;
`;

const NewBoard = () => {
  const { addBoard, setTab, setCurrentStatus } = useDataStore(
    (state: any) => state
  );
  const { closeModal } = useModalStore((state: any) => state);

  const initialValues = {
    name: "",
    columns: [""],
  };

  return (
    <Container>
      <Title>Create a New Board</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={NewBoardSchema}
        onSubmit={(values) => {
          const newBoard = {
            id: nanoid(2),
            name: values.name,
            columns: values.columns.map((column: string, i: number) => ({
              id: nanoid(3),
              name: column,
              tasks: [],
            })),
          };
          addBoard(newBoard);
          setTab(values.name);
          setCurrentStatus(values.name);
          closeModal();
        }}
      >
        {(values) => {
          return (
            <Form>
              <Field name="name" label="Name" type="text" />
              <ColumnsTitle>Columns</ColumnsTitle>
              <FieldArray name="columns">
                {(arrayHelpers) => {
                  return (
                    <>
                      {values.values.columns.map(
                        (column: string, i: number) => {
                          return (
                            <NewColumns key={i}>
                              <Field name={`columns[${i}]`} type="text" />
                              <DeleteColumn
                                type="button"
                                onClick={() => arrayHelpers.remove(i)}
                                disabled={values.values.columns.length < 2}
                              >
                                <FaTimes />
                              </DeleteColumn>
                            </NewColumns>
                          );
                        }
                      )}
                      {values.values.columns.length < 5 && (
                        <NewColumnButton
                          type="button"
                          variant="outlined"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Create a New Column
                        </NewColumnButton>
                      )}
                    </>
                  );
                }}
              </FieldArray>
              <Submit type="submit">Save Changes</Submit>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default NewBoard;
