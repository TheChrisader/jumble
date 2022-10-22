import React from "react";
import styled from "styled-components";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { nanoid } from "nanoid";
import { FaTimes } from "react-icons/fa";

import Field from "../shared/Field";
import { useModalStore } from "../../store/modalStore";
import TextArea from "../shared/TextArea";
import { NewTaskSchema } from "../../utils/Form";
import Button from "../shared/Button";
import { ISubtask } from "../../utils/types/DataTypes";
import Select from "../shared/Select";
import { useDataStore } from "../../store/store";

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

const SubtaskTitle = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 5px;
`;

const NewSubtask = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteSubtask = styled.button`
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

const NewSubtaskButton = styled(Button)`
  align-self: center;
  margin-top: 10px;
  margin-bottom: 50px;
  width: 100%;
`;

const Submit = styled(Button)`
  align-self: center;
  border-radius: 5px;
  margin-top: 30px;
`;

const NewTask = () => {
  const { detail, statusArr, boardTab, closeModal } = useModalStore(
    (state: any) => state
  );
  const { addTask } = useDataStore((state: any) => state);

  const initialValues = {
    title: "",
    description: "",
    subtasks: [
      {
        title: "",
        isCompleted: false,
      },
    ] as ISubtask[],
    status: detail.status,
  };

  return (
    <Container>
      <Title>Add New Task</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={NewTaskSchema}
        onSubmit={(values) => {
          const task = {
            ...values,
            id: nanoid(4),
          };
          addTask(boardTab, task);
          closeModal();
        }}
      >
        {(values) => {
          return (
            <Form>
              <Field label="Title" name="title" type="text" />
              <TextArea label="Description" name="description" />
              <SubtaskTitle>Subtasks</SubtaskTitle>
              <FieldArray name="subtasks">
                {(arrayHelpers) => {
                  return (
                    <>
                      {values?.values?.subtasks.map(
                        (item: ISubtask, i: number) => {
                          return (
                            <NewSubtask key={i}>
                              <Field
                                key={i}
                                name={`subtasks[${i}].title`}
                                type="text"
                              />
                              <DeleteSubtask
                                type="button"
                                onClick={() => arrayHelpers.remove(i)}
                                disabled={values.values.subtasks.length === 1}
                              >
                                <FaTimes />
                              </DeleteSubtask>
                            </NewSubtask>
                          );
                        }
                      )}
                      {values.values.subtasks.length < 7 && (
                        <NewSubtaskButton
                          variant="outlined"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ title: "", isCompleted: false })
                          }
                        >
                          + Add New Subtask
                        </NewSubtaskButton>
                      )}
                    </>
                  );
                }}
              </FieldArray>
              <Select
                name="status"
                options={statusArr}
                status={values.values.status}
              />
              <Submit type="submit">Add New Task</Submit>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default NewTask;
